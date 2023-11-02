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
      return { res: error, status: false, msg: 'error' };
    }
  }

  async ButtonUiResponsive(body: any) {
    try {
      console.log(body);
      if (body.style == undefined) {
        console.log('in if');
        const ui_static = `<div>
        <button class="custom-button">${body.data}</button>
              <style>
          .custom-button {
            padding: 1rem 2rem;
            border-radius: .5rem;
            border: none;
            font-size: 1rem;
            font-weight: 400;
            color:#333333;
            text-align: center;
            backdrop-filter: blur(10px);
            cursor: pointer;
          }
             
          .custom-button::before {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            border-radius: .5rem;
            background: linear-gradient(180deg, rgba(151,200,255,.44) 0%, rgba(8, 77, 126, 0.42) 100%),rgba(47,255,255,.24);
            box-shadow: inset 0 0 12px rgba(151,200,255,.44);
            z-index: -1;
          }  
          .custom-button::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, rgba(151,200,255,.44) 0%, rgba(8, 77, 126, 0.42) 100%),rgba(47,255,255,.24);
            box-shadow: inset 0 0 12px rgba(151,200,255,.44);
            border-radius: .5rem;
            opacity: 0;
            z-index: -1;
            transition: all .3s ease-in;
          }
          .custom-button:hover::after {
            opacity: 1;
          }
          .custom-button-border {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border-radius: .5rem;
            z-index: -1;
          }
          
          .custom-button::before {
            content: "";
            position: absolute;
            border-radius: .5rem;
            padding: 1px;
            inset: 0;
            background: linear-gradient(180deg, rgba(151,220,255,.44) 0%, rgba(184, 238, 255, 0) 100%),linear-gradient(0deg, rgba(184, 238, 255, 0.32), rgba(184, 238, 255, 0.32));
            -webkit-mask: linear-gradient( rgba(151,200,255,.44)) content-box,linear-gradient(rgba(151,200,255,.44));
            -webkit-mask-composite: xor;
            pointer-events: none;
          }
      </style>
          </div>`;
        return ui_static;
      } else {
        console.log('in else');
        const ui = `
      <div>
      <button class="custom-button">${body.data}</button>
            <style>
        .custom-button {
            ${body.style}
        }

       
        .custom-button:hover {
            background-color: #0056b3;
        }
    </style>
        </div>

            `;
        return ui;
      }
    } catch (error) {
      return { res: error, status: false, msg: 'error' };
    }
  }
}
