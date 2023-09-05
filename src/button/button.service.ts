import { Injectable } from '@nestjs/common';

@Injectable()
export class ButtonService {
  async ButtonUi() {
    try {
      const ui = await `
      <div>
      <button class="custom-button">Click Me</button>
            <style>
        .custom-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff; /* Button background color */
            color: #fff; /* Text color */
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        /* Button hover state */
        .custom-button:hover {
            background-color: #0056b3; /* Darker shade on hover */
        }
    </style>
        </div>

            `;
      return ui;
    } catch (error) {
      return error;
    }
  }

  async ButtonUiResponsive(body: any) {
    try {
      const ui = `
      <div>
      <button class="custom-button">${body}</button>
            <style>
        .custom-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff; /* Button background color */
            color: #fff; /* Text color */
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none;
        }

       
        .custom-button:hover {
            background-color: #0056b3;
        }
    </style>
        </div>

            `;
      return ui;
    } catch (error) {
      return error;
    }
  }
}
