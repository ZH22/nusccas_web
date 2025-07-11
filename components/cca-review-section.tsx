"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

// Typescript Interface for incoming data
type Review = {
  id: number;
  user_id: string;
  message: string;
  created_at: string;
  edited_at: string;
  profile_first_names: {
    first_name: string | null;
  } | null;
};

export default function ReviewSection({
  cca,
  user,
}: {
  cca: number;
  user: User | null;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");

  const supabase = createClient();

  // fetches all reviews for the particular CCA from Supabase
  const fetchReviews = async () => {
    const { data: reviewData, error: reviewError } = await supabase
      .from("reviews")
      .select(
        "id, user_id, message, created_at, edited_at, profile_first_names! user_id (first_name)"
      )
      .eq("cca_id", cca)
      .order("created_at", { ascending: false });

    if (reviewError) throw reviewError;

    setReviews(reviewData as unknown as Review[]);
  };

  // uploads newly written review to Supabase
  const handleSubmit = async () => {
    if (formData === "") return; // do nothing if nothing written as review

    const { data: submitData, error: submitError } = await supabase
      .from("reviews")
      .insert({ user_id: user?.id, cca_id: cca, message: formData });

    if (submitError) throw submitError;

    fetchReviews();
    setFormData("");
  };

  const handleEdit = async (review: Review) => {
    setEditingId(review.id);
    setEditedMessage(review.message);
  };

  // edits review message data in Supabase
  const handleEditSave = async (review: Review) => {
    if (editedMessage !== review.message && editedMessage !== "") {
      const { data: submitEditData, error: submitEditError } = await supabase
        .from("reviews")
        .update({ message: editedMessage, edited_at: new Date().toISOString() })
        .eq("id", editingId);

      if (submitEditError) throw submitEditError;
    }

    setEditingId(null);
    setEditedMessage("");
    fetchReviews();
  };

  // deletes whole review from Supabase
  const handleDelete = async (review: Review) => {
    const { data: deleteData, error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq("id", review.id);

    if (deleteError) throw deleteError;

    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, [cca]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Reviews</h2>

      {user ? (
        <div className="grid w-full gap-2 pb-7">
          <Textarea
            placeholder="Write your review here."
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit review</Button>
          {/*Allow users to write review if logged in*/}
        </div>
      ) : (
        <div className="gap-2 pb-7">
          <p>Please login before submitting a review.</p>
          <br />
          <Button onClick={() => redirect("/login")}>Login</Button>{" "}
          {/*Redirect if not logged in*/}
        </div>
      )}

      <div className="space-y-5">
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <p className="font-bold">
                {review.profile_first_names?.first_name || "No name"}
              </p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(review.created_at))} ago
                {review.edited_at && (
                  <span>
                    , edited {formatDistanceToNow(new Date(review.edited_at))}{" "}
                    ago
                  </span>
                )}
              </p>
            </div>

            {editingId === review.id ? (
              <>
                <Textarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                />
                <Button onClick={() => handleEditSave(review)}>Save</Button>
              </>
            ) : (
              <p>{review.message}</p>
            )}

            {/*Shows edit & delete buttons if review is written by the user*/}
            {review.user_id === user?.id && (
              <div className="flex items-center gap-3">
                <Button
                  className="text-xs"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(review)}
                >
                  Edit
                </Button>
                <Button
                  className="text-xs"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(review)}
                >
                  Delete
                </Button>
              </div>
            )}
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}
