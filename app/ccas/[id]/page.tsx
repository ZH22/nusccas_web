import CcaPage from "./cca-page";

export default async function CCA({ params }: { params: { id: string } }) {
  const { id } = await params;
  const id_num = Number(id);

  return (
    <>
      <CcaPage id={id_num} />
    </>
  );
}
