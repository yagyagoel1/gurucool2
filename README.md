# Astrologer Connection Manager

## Overview

Astrologer Connection Manager is a backend application designed to efficiently distribute users among available astrologers based on their current load. It uses a Flow Distribution Algorithm to prioritize the allocation of users to astrologers, ensuring a balanced workload across all astrologers.

The key features of the Astrologer Connection Manager include:
- User authentication and registration.
- Astrologer authentication and registration.
- Dynamic allocation of users to astrologers using the Flow Distribution Algorithm.
- Management of astrologer status and connections.

The application is built using Node.js, Express.js, MongoDB, and Redis for efficient data management and real-time connection distribution.
## Documentation
All the docs related to the project are here:
```https://drive.google.com/file/d/11XlzWjbqBA58jtAYZSVgGstJZzYy4xhe/view?usp=sharing```

## Getting Started

To run this project locally, follow these steps:
### Without Docker

1. Clone the repository:
   - Open your terminal.
   - Run the following command:
     ```
     git clone https://github.com/yagyagoel1/gurucool2.git
     ```

2. Navigate to the project directory:
   - Change into the project directory using:
     ```
     cd gurucool2
     ```

3. Set up environment variables:
   - Create a `.env` file in the root directory of the project using `.env.sample` (make sure to change the mongodb url and also the redis url .
   

4. Install dependencies:
   - Install the necessary dependencies using:
     ```
     npm install
     ```

5. Start the application:
   ```
   npm start
   ```
 ( or to test the project run ``` npm test ```)


### With Docker


1. Clone the repository:
   - Open your terminal.
   - Run the following command:
     ```
     git clone https://github.com/yagyagoel1/gurucool2.git
     ```
2. Navigate to the project directory:
   - Change into the project directory using:
     ```
     cd gurucool2
     ```
5. Start the application:
   ```
   sudo docker compose up
   ```
## Conclusion

In conclusion, the Astrologer Connection Manager is a robust backend application designed to efficiently manage the distribution of users among astrologers. Using a sophisticated Flow Distribution Algorithm, the application ensures a balanced workload among astrologers, providing users with seamless access to astrological services. With features such as user and astrologer authentication, dynamic user allocation, and real-time connection management, the Astrologer Connection Manager offers a scalable and reliable solution for astrologer-client interactions.
