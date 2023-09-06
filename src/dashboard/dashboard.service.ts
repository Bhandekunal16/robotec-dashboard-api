import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async createDashboard(body: any) {
    const ui = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <style>
        /* Reset some default styles */
        body, h1, p {
            margin: 0;
            padding: 0;
        }

        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        /* Header Styles */
        .header {
            background-color: #333;
            color: #fff;
            padding: 20px;
        }

        .header h1 {
            font-size: 36px;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 18px;
            text-align: center;
        }

        /* Main Content Styles */
        .main-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            height: 100%;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Styles */
        @media screen and (max-width: 768px) {
            .header h1 {
                font-size: 28px;
            }

            .header p {
                font-size: 16px;
                text-align: center;
            }
        }

        ul {
            list-style: none;
        }

        h1, h2{
            text-align: center;
        }

        .footerContent {
            background-color: #333;
            color: white;
            height: auto;
            width: 100%;
            position: fixed;
            bottom: 0;
          }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to Our Website</h1>
        <p>Discover Amazing Content and Services</p>
    </div>
    <div class="main-content">
        <h2>Our Services</h2>
        <ul>
            <li>Web Development</li>
            <li>Graphic Design</li>
            <li>Digital Marketing</li>
            <li>Content Creation</li>
        </ul>
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to <a href="contact.html">contact us</a>.</p>
    </div>
    <div class="footerContent">
      <a
        src="https://theme-pr6a747xx-bhandekunal16.vercel.app/"
        style="color: skyblue, padding: 5px 5px"
      >
        Robotic
      </a>
    </div>
</body>
</html>

   `;
    return ui;
  }
}
