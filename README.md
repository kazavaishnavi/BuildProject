                               ** Virtual Office Web App**
 
The Virtual Office project is a web app that makes remote meetings feel like being in a real office. It uses WebRTC and Simple-peer for smooth video calls where users can join or leave automatically, and it updates everyone’s virtual positions in real-time. Built with React, WebSocket, Express Server and WebRTC this app lets users interact through virtual characters, creating a more engaging and office-like remote experience. The aim is to combine the flexibility of working from home with the collaborative benefits of a traditional office.

**Video Demo of the Project :**
https://github.com/user-attachments/assets/cb3a84ce-67a6-4b21-a9aa-10dcfb935d0a

**Steps to run the code :**
1.	Go to your local directory in your terminal 
‘cd THE DIRECTORY WHERE YOU CLONED THE PROJECT/oa_virtoffice_project’
2.	You’ll see 2 directories: client and server 
3.	Go to the server directory 
`cd server` 
4.	Install all dependencies 
`npm install` 
If you run into any issues, let Xinyi know. 
5.	Go to server source directory 
`cd src` // you show be at oa_virtoffice_project_init_code/server/src 
6.	Start your backend server 
`node index.js` 
If it starts successfully, you should see “Server is running on port 8080” 
7.	Keep your server running and open a new terminal 
8.	Go to client directory 
`cd oa_virtoffice_project/client` 
9.	Install all dependencies 
`npm install` 
10.	Build frontend code 
`npm run-script build` 
You can ignore the warnings. If it builds successfully, you should see “The build folder is ready to be deployed.” towards the end. 
11.	Start your frontend server 
`serve -s build` or `npx  serve -s build ` 
12.	Open up a browser window and go to http://localhost:3000/ 
13.	You should see a map with a character in the middle 
14.	If you changed anything under the server directory, stop the terminal that’s running backend server, and rerun `node index.js` to restart the backend server 
15.	If you changed anything under the client directory (this directory is where most of the changes will be), stop the terminal that’s running the frontend server, rerun `npm run-script build` and `serve -s build` and reload localhost:3000. 


**Overall architecture**



<img width="450" alt="image" src="https://github.com/user-attachments/assets/f8dd8a73-7ba9-46bf-80d3-6cb545335244">
 
 
 
 
 
 


