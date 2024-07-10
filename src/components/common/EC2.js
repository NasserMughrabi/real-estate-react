import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Tooltip,
  Link,
  HStack,
  Text,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import {
  EC2Client,
  StartInstancesCommand,
  StopInstancesCommand,
  DescribeInstancesCommand,
} from "@aws-sdk/client-ec2";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

import AWS from "aws-sdk";

const EC2 = () => {
  const [EC2Status, setEC2Status] = useState("stopped");
  const [webStatus, setWebStatus] = useState("stopped");
  const [AWSWeb, setAWSWeb] = useState("");
  const [remainingTime, setRemainingTime] = useState(600); // 600 seconds = 10 minutes

  const EC2InstanceId = process.env.REACT_APP_EC2_ID;

  const ec2Client = new EC2Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const startEC2Instance = async () => {
    const startCommand = new StartInstancesCommand({
      InstanceIds: [EC2InstanceId],
    });

    try {
      await ec2Client.send(startCommand);
      setEC2Status("starting");

      //   console.log("EC2 Instance started:", startData);

      //   Check instance state and wait for it to start
      //   let instanceState = "pending";
      //   while (!instanceState || instanceState.toLowerCase() !== "running") {
      //     const statusResult = await waitForInstanceRunning(EC2InstanceId);
      //     instanceState = statusResult.Reservations[0].Instances[0].State.Name;
      //   }

      // Get instance public IP after starting
      const instanceIp = await getInstancePublicIp(EC2InstanceId);

      setAWSWeb(`http://${instanceIp}:3000`);

      // Wait for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));
      setEC2Status("running");
      setWebStatus("starting");
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Start project docker-compose on ec2
      await executeCommandOnEC2();

      // Terminate the instance after 10 minutes (600000 ms)
      setTimeout(async () => {
        const stopCommand = new StopInstancesCommand({
          InstanceIds: [EC2InstanceId],
        });
        await ec2Client.send(stopCommand);
        setEC2Status("stopped");
        // console.log("EC2 Instance terminated:", stopData);
      }, 600000);
    } catch (error) {
      console.error("Error starting EC2 Instance:", error);
    }
  };

  //   const waitForInstanceRunning = async (instanceId) => {
  //     const params = {
  //       InstanceIds: [instanceId],
  //     };
  //     const status = await ec2Client.send(new DescribeInstancesCommand(params));
  //     return status;
  //   };

  const getInstancePublicIp = async (instanceId) => {
    const params = {
      InstanceIds: [instanceId],
    };
    const { Reservations } = await ec2Client.send(
      new DescribeInstancesCommand(params)
    );
    const instance = Reservations[0].Instances[0];
    return instance.PublicIpAddress;
  };

  // AWS SDK Configuration
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  // Function to execute command using AWS SSM
  const executeCommandOnEC2 = async () => {
    const ssm = new AWS.SSM();

    try {
      const commandParams = {
        DocumentName: "realestate-ssm-document", // Example SSM document
        Targets: [
          {
            Key: "InstanceIds",
            Values: [EC2InstanceId],
          },
        ],
        Parameters: {
          commands: [
            "cd /home/ec2-user/realestate-fullstack",
            "docker-compose down",
            "docker-compose up -d",
          ],
        },
      };

      const commandResult = await ssm.sendCommand(commandParams).promise();
      //   console.log("Command sent:", commandResult);

      // Wait for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Check command status
      //   const params = {
      //     CommandId: commandResult.Command.CommandId,
      //     InstanceId: EC2InstanceId,
      //   };

      //   let result = "pending";
      //   while (result.toLowerCase() !== "success") {
      //     const invo = await ssm.getCommandInvocation(params).promise();
      //     result = invo.Status;
      //     // console.log("Command invocation result:", result);
      //   }

      setWebStatus("running");
    } catch (error) {
      console.error("Error executing command:", error);
      alert("Failed to execute command. Please check console for details.");
    }
  };

  // count down
  useEffect(() => {
    let timer;
    if (webStatus === "running") {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setRemainingTime(600); // Reset remaining time when instance is stopped
    }
    return () => clearInterval(timer);
  }, [webStatus]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Box pt={"5%"}>
      {EC2Status === "running" && webStatus === "running" && (
        <Box
          textAlign="center"
          bg="teal.500"
          color={"white"}
          p={6}
          mb={6}
          boxShadow="lg"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight={"bold"} mb={4}>
            EC2 terminates in
          </Text>
          <Text fontSize="2xl" fontWeight={"bold"} mb={4}>
            {formatTime(remainingTime)}
          </Text>
        </Box>
      )}
      {EC2Status === "stopped" && (
        <Box pt={4}>
          <Tooltip label="This will start the AWS EC2 server hosting this website">
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={startEC2Instance}
              // onClick={executeCommandOnEC2}
            >
              Start EC2 Instance
            </Button>
          </Tooltip>
        </Box>
      )}
      {EC2Status === "starting" && (
        <Box>
          <HStack spacing={4} align="center">
            <Spinner />
            <Box fontSize="lg">Starting EC2 ...</Box>
          </HStack>
        </Box>
      )}
      {EC2Status === "running" && webStatus === "starting" && (
        <Box>
          <HStack spacing={4} align="center">
            <Icon as={MdCheckCircle} color={"green.500"} fontSize={"24px"} />
            <Box fontSize="lg">EC2 Started</Box>
          </HStack>
          <HStack pt={4} spacing={4} align="center">
            <Spinner />
            <Box fontSize="lg">Starting docker containers on EC2 ...</Box>
          </HStack>
        </Box>
      )}
      {EC2Status === "running" && webStatus === "running" && (
        <Box>
          <Box p={4}>
            <HStack spacing={4} align="center">
              <Icon as={MdCheckCircle} color={"green.500"} fontSize={"24px"} />
              <Box fontSize="lg">EC2 Running</Box>
            </HStack>

            <HStack pt={4} spacing={4} align="center" mt={2}>
              <Icon as={MdCheckCircle} color={"green.500"} fontSize={"24px"} />
              <Box fontSize="lg">Website running on EC2</Box>
            </HStack>
            {AWSWeb && (
              //   <Tooltip label="This is a static React website hosted on Netlify, navigate to AWS EC2 IP where the fullstack website is hosted">
              <Tooltip label="Navigate to AWS EC2 IP where the fullstack website is hosted. This website is only React application hosted for free on netlify (no backend no db)">
                <Link href={AWSWeb} isExternal>
                  <HStack spacing={2} align="center" pt={5} pl={1}>
                    <FaExternalLinkAlt />
                    <Box fontSize="lg">Go to website</Box>
                  </HStack>
                </Link>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EC2;
