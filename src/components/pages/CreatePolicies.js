import React, { useState } from "react";
import CompanyNavbar from "./CompanyNavbar";
import Footer from "../components/Footer";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const CreateInsurance = () => {
  const url = "https://btp-backend-bu0a.onrender.com/api/v1/company/listPolicy";
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    companyName: "",
    policyName: "",
    policyID: "",
    max_amount: "",
    description: "",
    coverage: "",
    price: "",
  });
  const [submittedDataList, setSubmittedDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = formData.coverage.split(",");
    try {
      setIsLoading(true);
      await axios.post(
        url,
        {
          name: formData.policyName,
          company: user.name,
          coverage: arr,
          maxAmount: formData.max_amount,
          price: formData.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setSubmittedDataList([...submittedDataList, formData]);
    setFormData({
      companyName: "",
      policyName: "",
      coverage: "",
      max_amount: "",
      description: "",
      price: "",
    });
  };

  return (
    <>
      <CompanyNavbar />
      <Flex
        direction="column"
        minH="100vh"
        justify="space-between"
        align="center"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {/* Card Section */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          flex="1"
          px={4}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            minW={"30vw"}
          >
            <Heading fontSize={"2xl"} textAlign={"center"} mb={6}>
              Create Insurance
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="policyName" mb={4}>
                <FormLabel>Policy Name</FormLabel>
                <Input
                  type="text"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleChange}
                  placeholder="Enter Policy Name"
                />
              </FormControl>

              <FormControl id="coverage" mb={4}>
                <FormLabel>Coverage</FormLabel>
                <Input
                  type="text"
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleChange}
                  placeholder="Enter Body Parts Covered"
                />
              </FormControl>
              <FormControl id="max_amount" mb={4}>
                <FormLabel>Max Amount</FormLabel>
                <Input
                  type="text"
                  name="max_amount"
                  value={formData.max_amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                />
              </FormControl>
              <FormControl id="price" mb={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
              </FormControl>
              <FormControl id="description" mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoading}
                loadingText="Submitting"
                w="100%"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateInsurance;
