# Hall Analytics System

## 🌟 Overview
The **Hall Analytics System** is designed to analyze the hall usage data of a large organization. For this project, the organization is considered as a college, and the system allows various entities within the college (students, faculty, principal, etc.) to analyze hall data effectively. The key purpose is to identify patterns such as which halls are in high demand for events, how often they are booked, and other crucial insights. The project focuses on providing deep hands-on experience with aggregate queries in MongoDB.

---

## 🛠️ Tech Stack
- **Frontend**: HTML, Handlebars.js (for templating)
- **Backend**: Node.js
- **Database**: MongoDB (for storing hall data and event information)

---

## 🌟 Key Features
1. **Hall Demand Analysis**:
   - Identify which halls are in the highest demand for events.
   - Track hall availability and usage patterns.
2. **User Role-Based Access**:
   - Different user roles such as students, faculty, and principals can view and analyze hall data.
3. **Detailed Analytics**:
   - Graphical representation of hall bookings, showing trends and usage statistics.
4. **Aggregate Queries**:
   - Powerful database queries to analyze hall data and uncover hidden insights. Some complex queries include:
     - Total number of bookings per hall in a given month.
     - Most frequently booked halls for events (using aggregation pipelines).
     - Average duration of hall bookings per department.
     - The busiest times of the year for hall bookings.
     - Comparing hall bookings across different departments.
   
   **Example Complex Queries**:
   ```javascript
   // Total bookings per hall in the current year
   db.bookings.aggregate([
     { $match: { bookingDate: { $gte: new Date('2024-01-01') } } },
     { $group: { _id: "$hallId", totalBookings: { $sum: 1 } } },
     { $sort: { totalBookings: -1 } }
   ]);

   // Find the most frequently booked halls in the last 6 months
   db.bookings.aggregate([
     { $match: { bookingDate: { $gte: new Date('2024-07-01') } } },
     { $group: { _id: "$hallId", count: { $sum: 1 } } },
     { $sort: { count: -1 } },
     { $limit: 5 }
   ]);

   // Find the total number of events for each student
   db.hall.aggregate([
     { $lookup: { from : "students" , localField : "Event_handler_id" , foreignField : "Student_id" , as : "id" } },
     { $unwind: "$id" },
     { $group: { _id: "$id.Student_name", Total_Event: { $sum: 1 } } }
   ]);
