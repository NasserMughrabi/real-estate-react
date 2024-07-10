// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Tooltip,
//   Link,
//   HStack,
//   Text,
//   Spinner,
//   Icon,
//   VStack,
// } from "@chakra-ui/react";
// import {
//   EC2Client,
//   StartInstancesCommand,
//   StopInstancesCommand,
//   DescribeInstancesCommand,
// } from "@aws-sdk/client-ec2";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { MdCheckCircle } from "react-icons/md";

// import AWS from "aws-sdk";

// const EC2 = () => {
//   const [EC2Status, setEC2Status] = useState("EC2 is stopped");
//   const [webStatus, setWebStatus] = useState("Website is stopped");
//   const [AWSWeb, setAWSWeb] = useState("");
//   const [remainingTime, setRemainingTime] = useState(600); // 600 seconds=10 minutes

//   const EC2InstanceId = process.env.REACT_APP_EC2_ID;

//   const ec2Client = new EC2Client({
//     region: "us-east-1",
//     credentials: {
//       accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//     },
//   });

//   const startEC2Instance = async () => {
//     const startCommand = new StartInstancesCommand({
//       InstanceIds: [EC2InstanceId],
//     });

//     try {
//       await ec2Client.send(startCommand);
//       setEC2Status("EC2 is starting");

//       // Get instance public IP after starting
//       const instanceIp = await getInstancePublicIp(EC2InstanceId);

//       setAWSWeb(`http://${instanceIp}:3000`);

//       // Wait for 5 seconds
//       await new Promise((resolve) => setTimeout(resolve, 10000));
//       setEC2Status("EC2 is running");
//       setWebStatus("Website is starting");
//       await new Promise((resolve) => setTimeout(resolve, 10000));

//       // Start project docker-compose on ec2
//       await executeCommandOnEC2();

//       // Terminate the instance after 10 minutes (600000 ms)
//       setTimeout(async () => {
//         // console.log("EC2 Instance terminated:", stopData);
//         await terminateEC2();
//       }, 600000);
//     } catch (error) {
//       console.error("Error starting EC2 Instance:", error);
//     }
//   };

//   const terminateEC2 = async () => {
//     const stopCommand = new StopInstancesCommand({
//       InstanceIds: [EC2InstanceId],
//     });
//     await ec2Client.send(stopCommand);
//     setEC2Status("EC2 is stopping");
//     setWebStatus("Website is stopping");
//     await new Promise((resolve) => setTimeout(resolve, 10000));
//     setEC2Status("EC2 is stopped");
//     setWebStatus("Website is stopped");
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

//   // AWS SDK Configuration
//   AWS.config.update({
//     region: "us-east-1",
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   });

//   // Function to execute command using AWS SSM
//   const executeCommandOnEC2 = async () => {
//     const ssm = new AWS.SSM();

//     try {
//       const commandParams = {
//         DocumentName: "realestate-ssm-document", // Example SSM document
//         Targets: [
//           {
//             Key: "InstanceIds",
//             Values: [EC2InstanceId],
//           },
//         ],
//         Parameters: {
//           commands: [
//             "cd /home/ec2-user/realestate-fullstack",
//             "docker-compose down",
//             "docker-compose up -d",
//           ],
//         },
//       };

//       await ssm.sendCommand(commandParams).promise();

//       // Wait for 5 seconds
//       await new Promise((resolve) => setTimeout(resolve, 5000));

//       setWebStatus("Website is running");
//     } catch (error) {
//       console.error("Error executing command:", error);
//       alert("Failed to execute command. Please check console for details.");
//     }
//   };

//   // count down
//   useEffect(() => {
//     let timer;
//     if (webStatus === "Website is running") {
//       timer = setInterval(() => {
//         setRemainingTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       setRemainingTime(600); // Reset remaining time when instance is stopped
//     }
//     return () => clearInterval(timer);
//   }, [webStatus]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
//   };

//   return (
//     <Box pt={"5%"}>
//       {(EC2Status === "EC2 is stopping" ||
//         webStatus === "Website is running") && (
//         <Box
//           textAlign="center"
//           bg={EC2Status === "EC2 is stopping" ? "red.500" : "teal.500"}
//           color={"white"}
//           p={6}
//           mb={6}
//           boxShadow="lg"
//           borderRadius="md"
//         >
//           <Text fontSize="2xl" fontWeight={"bold"} mb={4}>
//             EC2 terminates in
//           </Text>
//           <Text fontSize="2xl" fontWeight={"bold"} mb={4}>
//             {formatTime(remainingTime)}
//           </Text>
//           <Button variant="solid" colorScheme="red" onClick={terminateEC2}>
//             {EC2Status === "EC2 is stopping"
//               ? "Terminating ..."
//               : "Terminate Now"}
//           </Button>
//         </Box>
//       )}
//       {EC2Status === "EC2 is stopped" && (
//         <Box pt={8}>
//           <VStack spacing={6} textAlign={"center"}>
//             <Button
//               variant="outline"
//               colorScheme="blue"
//               onClick={startEC2Instance}
//             >
//               Start EC2 Instance
//             </Button>
//             <Text fontSize="lg">
//               Clicking this button will start the AWS EC2 server that hosts the
//               Real Estate Listings website.
//             </Text>
//             <Text fontSize="lg">
//               This will initialize the EC2 instance and launch Docker containers
//               for React, Spring Boot API, and MySQL database.
//             </Text>
//             <Text fontSize="lg">
//               This approach significantly reduces hosting costs for my database
//               and API while showcasing my software development and DevOps
//               skills.
//             </Text>
//             <Text fontSize="lg">
//               For more information on how I built this project, please read my{" "}
//               <Link
//                 textDecoration={"underline"}
//                 color={"blue.500"}
//                 href="https://medium.com/@mughrabi.nasser/java-spring-boot-mysql-react-aws-full-stack-project-from-scratch-to-production-9b703563ec23"
//                 isExternal
//               >
//                 blog
//               </Link>
//               .
//             </Text>
//           </VStack>
//         </Box>
//       )}
//       {EC2Status !== "EC2 is stopped" && (
//         <Box>
//           <HStack spacing={4} align="center">
//             {EC2Status !== "EC2 is running" ||
//             EC2Status === "EC2 is stopping" ? (
//               <Spinner />
//             ) : (
//               <Icon as={MdCheckCircle} color={"green.500"} fontSize={"24px"} />
//             )}
//             <Box fontSize="lg">{EC2Status}</Box>
//           </HStack>
//           <HStack pt={4} spacing={4} align="center">
//             {webStatus !== "Website is running" ||
//             webStatus === "Website is stopping" ? (
//               <Spinner />
//             ) : (
//               <Icon as={MdCheckCircle} color={"green.500"} fontSize={"24px"} />
//             )}
//             <Box fontSize="lg">{webStatus}</Box>
//           </HStack>
//           {EC2Status === "EC2 is running" &&
//             webStatus === "Website is running" && (
//               <Link href={AWSWeb} isExternal>
//                 <HStack spacing={2} align="center" pt={5} pl={1}>
//                   <FaExternalLinkAlt />
//                   <Box fontSize="lg">Go to website</Box>
//                 </HStack>
//               </Link>
//             )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default EC2;
