from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from dotenv import load_dotenv
load_dotenv()

import os
from supabase import create_client

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

def load_all():
    while True:
        try:
            load_more_button = driver.find_element(By.XPATH, "//*[text()='Load More']")
            load_more_button.click()
            time.sleep(1)
        except NoSuchElementException:
            print("All CCAs in current branch loaded.")
            break

def extract_info(website, branch):
    driver.get(website)

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CLASS_NAME, "engage-application"))
    )

    website_url = website
    logo_url = None
    ig_url = None

    name = driver.find_element(By.TAG_NAME, "h1").text
    description = driver.find_element(By.CLASS_NAME, "bodyText-large").text

    try:
        logo_url = driver.find_element(By.TAG_NAME, "img").get_attribute("src")
    except NoSuchElementException:
        print("Logo not found.")

    try:
        ig_url = driver.find_element(By.CSS_SELECTOR, "a[href*='instagram.com/']").get_attribute("href")
    except NoSuchElementException:
        print("IG not found.")

    response = (
        supabase.table("cca_data")
        .insert({"name": name, "description": description, "website_url": website_url, "logo_url": logo_url, "ig_url": ig_url, "branch": branch})
        .execute()
    )

    print(name)
    print(description)
    print(logo_url)
    print(ig_url)
    print(website_url)
    print(branch)
    print("\n\n\n")

def extract_all_info(branch):
    all_ccas = driver.find_elements(By.CSS_SELECTOR, "a[href*='/engage/organization/']")
    all_ccas_href = list(map(lambda cca: cca.get_attribute("href"), all_ccas))

    for cca_website in all_ccas_href:
        extract_info(cca_website, branch)

def select_branch():
    website = "https://nus.campuslabs.com/engage/organizations"
    driver.get(website)

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CLASS_NAME, "engage-application"))
    )

    select_branches = driver.find_element(By.XPATH, "//*[text()='Select branches']")
    select_branches.click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CLASS_NAME, "MuiMenu-list"))
    )

select_branch()
branches = driver.find_element(By.CLASS_NAME, "MuiMenu-list").text

for branch in branches.split("\n"):
    if (branch == "Office of Student Affairs" or
        branch == "Residential Life" or
        branch == "Student Life @ Faculties"):
        print("Skipping Branch: " + branch)
        continue

    filter_branch = driver.find_element(By.XPATH, f'//*[text()="{branch}"]')
    driver.execute_script("arguments[0].click();", filter_branch)
    #filter_branch.click()
    time.sleep(3)
    actions = ActionChains(driver)
    actions.send_keys(Keys.TAB).perform()
    time.sleep(1)
    load_all()
    extract_all_info(branch)
    select_branch()

time.sleep(10)