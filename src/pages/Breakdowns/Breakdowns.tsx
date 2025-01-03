import React from "react";
import { Box, Flex, Grid, HStack, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toaster } from "../../components/ui/toaster";
import { BreakDownPayload } from "../../common/interfaces";
import { reportBreakdown } from "../../services/vehicles";
import { Button } from "../../components/ui/button";
import { Field } from "../../components/ui/field";
import { getLocation } from "../../common/functions";
import { useNavigate } from "react-router-dom";

interface BreakDownInputs {
  vehicleNumber: string;
  description: string;
}

const Breakdowns = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BreakDownInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<BreakDownInputs> = async (data) => {
    try {
      const { lat, lon } = await getLocation();

      const payload: BreakDownPayload = {
        vehicleNumber: data.vehicleNumber,
        description: data.description,
        lat,
        lon,
      };

      await reportBreakdown(payload);
      toaster.create({
        description: "Reported successfully!",
        type: "success",
      });
      navigate("/home");
    } catch (error) {
      toaster.create({
        description: "Uncaught Error!",
        type: "error",
      });
    }
  };

  return (
    <Box
      flexDir="column"
      lgDown={{ p: 5 }}
      lg={{ px: 28, py: 12 }}
      xl={{ px: 32, py: 12 }}
    >
      <Text
        textAlign={{ base: "center", md: "left" }}
        fontSize="3xl"
        fontWeight="bold"
        mb={5}
      >
        Report a breakdown
      </Text>
      <Box w="full" mt={4} flexGrow={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={5}>
            <Field label="Vehicle Registration Number">
              <Input
                id="registerNumber"
                placeholder="Registration Number"
                {...register("vehicleNumber", {
                  required: "Registration number is required",
                  minLength: {
                    value: 3,
                    message:
                      "Registration Number must be at least 3 characters long",
                  },
                })}
                bg="white"
                borderColor="secondary.200"
                _focus={{ borderColor: "none", outline: "none" }}
              />
              <Text fontSize="xs" color="red.600">
                {errors.vehicleNumber && errors.vehicleNumber.message}
              </Text>
            </Field>
            <Field label="Description">
              <Input
                id="description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 3,
                    message: "Description must be at least 3 characters long",
                  },
                })}
                bg="white"
                borderColor="secondary.200"
                _focus={{ borderColor: "none", outline: "none" }}
              />
              <Text fontSize="xs" color="red.600">
                {errors.description && errors.description.message}
              </Text>
            </Field>
          </Grid>
          <Flex justify={"flex-end"}>
            <HStack mt={6}>
              <Button onClick={() => reset()} colorPalette="red" type="button">
                Clear
              </Button>
              <Button loading={isSubmitting} colorPalette="cyan" type="submit">
                Report
              </Button>
            </HStack>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Breakdowns;
