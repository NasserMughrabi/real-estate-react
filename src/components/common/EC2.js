// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Tooltip,
//   Link,
//   HStack,
//   Heading,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import {
//   EC2Client,
//   StartInstancesCommand,
//   StopInstancesCommand,
//   DescribeInstancesCommand,
// } from "@aws-sdk/client-ec2";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { Client } from "ssh2";

// const EC2 = () => {
//   const [EC2Running, setEC2Running] = useState(false);
//   const [AWSWeb, setAWSWeb] = useState("");
//   const [remainingTime, setRemainingTime] = useState(600); // 600 seconds = 10 minutes
//   const toast = useToast();

//   const ec2Client = new EC2Client({
//     region: "us-east-1",
//     credentials: {
//       accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//     },
//   });

//   const startEC2Instance = async () => {
//     const startCommand = new StartInstancesCommand({
//       InstanceIds: ["i-02f4c97a8a44d31ac"],
//     });

//     try {
//       const startData = await ec2Client.send(startCommand);
//       setEC2Running(true);

//       console.log("EC2 Instance started:", startData);
//       toast({
//         title: "EC2 Instance starting",
//         description: "Please allow 1-3 minutes for it to start!",
//         status: "success",
//         duration: 10000,
//         isClosable: true,
//         position: "top",
//       });

//       // Wait for the instance to start
//       await waitForInstanceRunning("i-02f4c97a8a44d31ac");

//       // Get instance public IP after starting
//       const instanceIp = await getInstancePublicIp("i-02f4c97a8a44d31ac");

//       // ssh to ec2 and run Docker Compose
//       try {
//         await startDockerCompose(instanceIp);
//       } catch (error) {
//         console.log("docker: ", error);
//       }

//       setAWSWeb(`http://${instanceIp}:3000`);
//       // Wait for services to be ready
//       //   await waitForServices();

//       // Terminate the instance after 10 minutes (600000 ms)
//       setTimeout(async () => {
//         const stopCommand = new StopInstancesCommand({
//           InstanceIds: ["i-02f4c97a8a44d31ac"],
//         });
//         const stopData = await ec2Client.send(stopCommand);
//         setEC2Running(false);
//         console.log("EC2 Instance terminated:", stopData);
//       }, 600000);
//     } catch (error) {
//       console.error("Error starting EC2 Instance:", error);
//     }
//   };

//   const startDockerCompose = async (instanceIp) => {
//     // const { Client } = require("ssh2"); // Ensure you have the ssh2 package installed
//     // const fs = require('fs');
//     // const path = require('path');

//     // // Path to your private key file
//     // const privateKeyPath = path.resolve('/Users/nasser/documents/ec2-keys/realestate-ec2-key.pem');
//     // const privateKey = fs.readFileSync(privateKeyPath);
//     const privateKey = process.env.REACT_APP_SSH_PRIVATE_KEY.replace(
//       /\\n/g,
//       "\n"
//     ); // Replace newline characters for correct formatting

//     console.log("private key: ", privateKey);

//     const conn = new Client();
//     await new Promise((resolve, reject) => {
//       conn
//         .on("ready", async () => {
//           console.log("SSH connection ready");

//           // Execute Docker Compose command
//           conn.exec("docker-compose up -d", (err, stream) => {
//             if (err) {
//               console.error("Error executing Docker Compose command:", err);
//               reject(err);
//               return;
//             }
//             stream
//               .on("close", (code, signal) => {
//                 console.log("Docker Compose command executed");
//                 resolve();
//               })
//               .stderr.on("data", (data) => {
//                 console.error("STDERR:", data.toString());
//               });
//           });
//         })
//         .connect({
//           host: instanceIp, // Replace with your EC2 instance's public IP
//           port: 22,
//           username: "ec2-user", // Replace with the appropriate username for your AMI
//           privateKey: privateKey,
//           // You may need additional options like passphrase for the private key if applicable
//         });
//     });
//   };

//   //   const waitForServices = async () => {
//   //     let servicesReady = false;
//   //     while (!servicesReady) {
//   //       try {
//   //         // Example: Check an endpoint to see if services are ready
//   //         const response = await axios.get(
//   //           "http://your_backend_server_ip:3001/check-services"
//   //         );
//   //         if (response.data.servicesReady) {
//   //           servicesReady = true;
//   //         } else {
//   //           // Wait for a few seconds before checking again
//   //           await new Promise((resolve) => setTimeout(resolve, 5000));
//   //         }
//   //       } catch (error) {
//   //         console.error("Error checking services:", error);
//   //         // Handle errors appropriately
//   //         await new Promise((resolve) => setTimeout(resolve, 5000));
//   //       }
//   //     }
//   //   };

//   const waitForInstanceRunning = async (instanceId) => {
//     const params = {
//       InstanceIds: [instanceId],
//     };
//     await ec2Client.send(new DescribeInstancesCommand(params));
//   };

//   const getInstancePublicIp = async (instanceId) => {
//     const params = {
//       InstanceIds: [instanceId],
//     };
//     const { Reservations } = await ec2Client.send(
//       new DescribeInstancesCommand(params)
//     );
//     const instance = Reservations[0].Instances[0];
//     return instance.PublicIpAddress;
//   };

//   // count down
//   useEffect(() => {
//     let timer;
//     if (EC2Running) {
//       timer = setInterval(() => {
//         setRemainingTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       setRemainingTime(600); // Reset remaining time when instance is stopped
//     }
//     return () => clearInterval(timer);
//   }, [EC2Running]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
//   };

//   return (
//     <Box pt={"10%"}>
//       {EC2Running ? (
//         <>
//           <Tooltip
//             label="This is static react website hosted on netlify, 
//       navigate to AWS EC2 IP where the fullstack website is hosted"
//           >
//             <Link href={AWSWeb}>
//               <HStack align={"center"}>
//                 <Box>Go to AWS website</Box>
//                 <FaExternalLinkAlt mx="2px" />
//               </HStack>
//             </Link>
//           </Tooltip>
//           <Box
//             textAlign="center"
//             position="absolute"
//             left={5}
//             top={20}
//             bg="teal.500"
//             color={"white"}
//             p={6}
//             boxShadow="lg"
//             borderRadius="md"
//           >
//             <Heading as="h1" size="xl" mb={4}>
//               Countdown
//             </Heading>
//             <Text fontSize="2xl" fontWeight={"bold"} mb={4}>
//               {formatTime(remainingTime)}
//             </Text>
//           </Box>
//         </>
//       ) : (
//         <Tooltip label="This will start the AWS EC2 server hosting this website">
//           <Button
//             variant="outline"
//             colorScheme="blue"
//             onClick={startEC2Instance}
//           >
//             Start EC2 Instance
//           </Button>
//         </Tooltip>
//       )}
//     </Box>
//   );
// };

// export default EC2;
