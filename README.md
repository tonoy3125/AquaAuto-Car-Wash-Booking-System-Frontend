# Aqua Auto Car Wash Booking System Application

# Description

Aqua Auto Car Booking System is a user-friendly web application designed for seamless car wash and service bookings. Customers can browse services, view details, and easily book time slots. The Home Page offers clear navigation with a quick booking option. Users can sign up securely and manage their profile, past bookings, and upcoming bookings from a personalized dashboard. Administrators can efficiently manage services, bookings, and user roles through a dedicated admin dashboard, ensuring smooth operations.

## Features

1. **User Interface and Navigation**

- **Homepage:**
  - A welcoming homepage with a visually appealing hero section that highlights key pages like Services, Booking, and Login, along with an introduction and visuals that clearly show what the car wash service is all about.".
  - **Featured Services:** Highlight up to six of your best services, showcasing them with clear images and short descriptions. This section makes it easy for customers to quickly understand the most popular offerings you have, allowing them to see what they can expect from your services in a simple, attractive way
  - **Review Section:** The Review Section allows users to leave feedback and rate the site with a 1-5 star rating system. A text area is provided for writing reviews. Once a review is submitted, the average site rating is displayed along with the last two user reviews (rating + feedback). A "See All Reviews" button redirects to a page with all reviews.If the user is not logged in, a black overlay with a "Login" button is displayed above the review section. Clicking the button redirects them to the login page. After logging in, the user is redirected to the homepage. If the user is already logged in, the overlay will not appear.
  - **Header:** A responsive navigation bar that includes a logo, site name, and links to important sections like Services, Booking, About Us, Contact Us, and Dashboard.
  - **Footer:** Contains important links to contact information, social media platforms, terms of service, privacy policy, and other relevant resources.

2. **User Authentication Pages:**

- **Sign Up Page:**

  - Users can sign up and will automatically be assigned the "USER" role by default. Initially, there will be an admin in the database, and this admin will have the ability to promote other users to the "ADMIN" role when necessary. The system allows users to create new accounts with a simple and secure registration process. It also includes form validation to ensure that all required fields are correctly filled out. After the registration attempt, the system will display appropriate success or error messages based on whether the process was completed successfully or if any issues occurred.

- **Login Page:**

  - Users can log in by entering their email and password, and the system will use token-based authentication to verify their identity. If there are any issues with the login process, such as incorrect credentials or other errors, the system will provide clear and helpful error messages to guide the user in resolving the issue. This ensures a smooth and secure login experience.

3. **Services Page:**

   - The service page shows a complete list of all available car wash services, each with detailed descriptions, prices, and the time it takes to complete. Users can easily search for specific services, filter them based on criteria such as price or duration, and sort them to find the options that best suit their needs. This helps users quickly find the right service based on their preferences and budget.

4. **Service Details Page:**

   - The service details page provides complete information about the selected service, including its features and available time slots. By default, the page displays the time slots for the current date, making it easy for users to see the options right away. Time slots that are already booked will be disabled and unclickable to prevent any confusion, while available slots will remain clickable, allowing users to choose their preferred time. Additionally, users can use an optional calendar feature to select a different date, and the time slots available for that specific date will be displayed. Once a time slot is selected, a "Book This Service" button will appear, enabling users to confirm their booking quickly and easily.

5. **Booking Page:**

   - The booking page is organized into two sections displayed side by side for a clear and user-friendly experience.

   - On the Left Side, users will see an overview of the selected service and time slot presented in an attractive and visually appealing design. This section provides a quick summary of their choice, ensuring clarity before proceeding with the booking process.

   - On the Right Side, there is a form for users to fill in their personal information, such as name and email, with the selected time slot automatically filled in for convenience. This section also features a "Pay Now" button for seamless payment processing.

   - When the "Pay Now" button is clicked, the user is redirected to the secure AAMARPAY payment gateway to complete the transaction. Once the payment is successful, the system automatically updates the selected time slot’s status to "booked" to prevent double bookings. Finally, the user is redirected to a success page, confirming their booking and providing any necessary follow-up details.

6. **Admin Product Management:**

   The admin dashboard provides an overview of recent bookings, user management, slot management, and service management.

- **Access:**
  - Only admin users can access the dashboard.
- **Service Management:**

  - Service details are shown in a table for easy viewing.
  - An "Add Service" button lets admins add new services. Clicking the button opens a form in a modal. After filling out and submitting the form, the modal closes, and the new service is instantly added to the table for a smooth experience.
  - Each row in the table has buttons to update or delete services.
  - Clicking the update button opens a modal with pre-filled details of the selected service, making editing simple and quick.
  - A confirmation pop-up appears before deleting a service to confirm the action.

- **Slot Management:**

  - Admins can create and manage slots for services.
  - Slot statuses can be updated individually, except for booked slots.
  - Admins can toggle slot statuses between "AVAILABLE" and "CANCELLED."

- **User Management:**
  - Admins can view user bookings in a table for better organization.
  - Admins can also manage the user list and update user roles.

**User Dashboard:**

The user dashboard is designed to provide a clear and organized view of bookings and account information.

- **Profile Management: :**
  - Users can easily update their profiles and manage personal information, such as their name, email, and contact details, ensuring their account stays up to date.
- **Past Bookings:**
  - A complete list of all past bookings is displayed in a clean, tabular format, making it simple for users to review their booking history.
- **Upcoming Bookings:**

  - Future bookings are presented in card format for a visually appealing layout. Each card includes key details about the service and a countdown timer that shows the time remaining until the booking begins.

- **Service Slot Countdown:**

  - Once a booking is created, users will see a countdown timer that tracks the time left until their selected slot begins. If a user has multiple bookings, only the countdown for the next immediate slot will be shown in the navbar, ensuring they are always aware of their most urgent appointment. Additionally, in the "Upcoming Bookings" section, each booking card will feature its own countdown timer, helping users stay on top of all their upcoming commitments. This ensures a smooth and user-friendly experience.

8. **Error Handling:**

- **User-Friendly Messages:**
  - All error scenarios, such as invalid form inputs, failed payment attempts, or out-of-stock items, are handled gracefully with descriptive error messages shown to the user.
- **Validation:**
  - Frontend form validations are in place for user details, product additions, and checkout processes, ensuring that required fields are completed before submission.

9. **Responsive Design:**

- **Mobile-Friendly:**
  - The entire frontend is designed to be fully responsive, ensuring an optimized experience on all devices, including desktops, tablets, and mobile phones.
- **Adaptive UI:**
  - Layouts adjust dynamically based on screen size, ensuring intuitive navigation and interaction regardless of the device being used.

## Technology Stack

- **Programming Language:** TypeScript
- **Framework & Library:** React.js (with Hooks and Functional Components), Redux Toolkit (RTK)
- **UI Framework & Styling:** Tailwind CSS, raw CSS for specific hover effects
- **API Handling:** Axios, RTK Query for asynchronous API calls
- **Form Handling & Validation:** React Hook Form, Zod for validation schema
- **Routing:** React Router
- **Authentication:** JSON Web Tokens (JWT), with Redux for state persistence
- **Payment:** AAMARPAY
- **Persistence:** Redux Persist for saving authenticated user data and wishlist
- **Image Handling:** Cloudinary (for image management)
- **Deployment:** Deployed on Vercel

## Installation and Setup

1. Clone the repository:

```
https://github.com/tonoy3125/AquaAuto-Car-Wash-Booking-System-Frontend.git
```

2. Install dependencies:

```
cd aquaAuto-car-wash-booking-system-frontend
npm install
```

4. Start the server:

```
npm run dev
```

5. Access the application in your browser at `http://localhost:5173 || http://localhost:5174`

## Usage

- Upon accessing the homepage, users are welcomed by a visually striking hero section showcasing the brand and its key offerings. As they scroll down, they’ll find a category section with images or icons that let them quickly explore products. Clicking on a category takes them to the products page with the chosen filter applied.

- Featured products highlight popular items, showing images, names, and prices with a "View More" button. An "Explore More" option leads to the full product list. The benefits section outlines key product advantages, while an image gallery shows real-life use, creating a personal connection.

- Navigation is simple with a responsive header featuring links to Home, Products, Cart, and Wishlist, and a footer with key links like contact info and terms of service.

- On the products page, users can view items in a grid or list format, each showing name, price, and images. They can search using a bar with real-time suggestions and filter by category or price range. Users can input custom price ranges and sort items by price. A "Clear Filters" button resets all selections.

- Clicking a product shows detailed info such as stock, description, and images. Users can add items to the cart or increase quantities if available. The cart page displays selected items, with options to adjust quantities or remove products. Pricing updates automatically, reflecting taxes and shipping. The checkout button stays active only when all items are in stock, redirecting to the final checkout process, where users fill in their details and choose between Cash on Delivery or Stripe for payment.

- Wishlist management allows users to easily add or remove items, with real-time updates. Wishlists persist across sessions, and buttons toggle based on product status.

- Admins manage products via a dashboard, where they can add, edit, or delete items. A table view lists products with options to update or remove them, ensuring smooth product management and user experience.
