# cs24-p2-homo_sapiens

## Installation

You need Docker installed to run this website. Clone the repository. Fill up the required environment information on `compose.yml`, `.env.local`, `.env`. Then run the command `docker-compose up --build`. It will start running frontend server on port 3000, backend server on port 8000 and database server on port 5432. On it's first run, it will create an admin user with _email:_ **admin@ecosync.com** and _password:_ **admin**. It will also create a DNCC landfill with ID 1, coordinates, latitude: 23.7995223, longitude: 90.2961618 [Link](https://www.google.com/maps/place/Amin+Bazar+Waste+Disposal+Area,+Dhaka+-+Aricha+Hwy,+Bongaon+Union/@23.7979155,90.297811,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c027ef676a67:0x5fe1e3bd938ee50c!8m2!3d23.7979475!4d90.3001659!16s%2Fg%2F11bvtjjtzf?entry=ttu).

# EcoSync

EcoSync is a project developed for CodeSamurai - 2024, aimed at revolutionizing solid waste management in the bustling city of Dhaka, particularly under the Dhaka North City Corporation (DNCC). With the city's economic significance and millions of residents' dreams at stake, EcoSync endeavors to redefine waste management through innovative approaches and collaborative efforts.

## Project Description

The DNCC, recognizing the pressing challenges of solid waste management, has initiated multi-pronged efforts to address inefficiencies in domestic waste collection and explore pioneering initiatives such as waste-to-energy conversions in collaboration with international partners. EcoSync stands as a testament to this visionary approach, aiming to bring about significant improvements in Dhaka's waste management landscape.

## Useful Links (Updated till phase 2)

1. **Entity Relationship Diagram (ERD):** [Link](https://lucid.app/lucidchart/69c909ff-b928-4564-bcdf-01e8ed34242e/edit?viewport_loc=-474%2C-2%2C1981%2C985%2C0_0&invitationId=inv_138ece15-5f73-49d0-88da-ed9699128d34)
2. **Figma Design:** [Link](https://www.figma.com/file/Fj4WF3QnN8lGh2kz79wIcx/CodeSamurai?type=design&node-id=0%3A1&mode=design&t=WpSti6OSnHqc5DAC-1)

3. **Activity Diagram:** [Link](https://lucid.app/lucidchart/0a3571b1-314a-4f5a-9a58-18d06e3d144b/edit?viewport_loc=170%2C-770%2C3468%2C1604%2C0_0&invitationId=inv_3f95cf7d-3552-4ab4-b287-4eb4ab1dbbfb)

4. **API Documentation:** [Link](https://docs.google.com/spreadsheets/d/1ynvCuDxWcX8Eih--dPLbgo0kyl_JGHD3ZLu9Gt5wxDI/edit?usp=sharing)

5. **Workflow Diagram:** [Link](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=EcoSync_Workflow.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1lQrr7mW8JtFAedQmU6Wrl4K8V1Ukk70b%26export%3Ddownload)

## Super User Dashboard Page

![Dashboard (Super User)](/resources/Pages/Web/Dashboard_AIO_User.png)

## Homo_spaiens

We are Homo_spaiens from Shahjalal University of Science and Technology. Here's our contact information:

- **Mohammad Shaifur Rahaman**
  - Email: shaifurrahamanshifat71@gmail.com
- **Md. Nasiat Hasan Fahim**
  - Email: nhfahim18@gmail.com
- **Md. Shahiduzzaman**
  - Email: bipulhf@gmail.com

## ER Diagram (Updated till phase 2)

![ERD](/resources/EcoSync_ERD.png)

## Activity Diagram (Updated till phase 2)

![Activity](/resources/EcoSync_Activity.png)

## Workflow Diagram (Updated till phase 2)

![Activity](/resources/EcoSync_Workflow.png)

## Technologies Used

- **Frontend**: Next.js with React
- **UI Library**: Ant Design
- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Email Service**: Nodemailer with Google SMTP server

## Some Pages

You can see more on [Resources](/resources/).

![Home Page](/resources/Pages/Web/HomePage.png)
![Change Password](/resources/Pages/Web/Change_Password.png)
![Waste Trasported to STS](/resources/Pages/Web/Waste_Transported_To_Sts.png)
![Schedule Planner](/resources/Pages/Web/Schedule_Plan.png)
