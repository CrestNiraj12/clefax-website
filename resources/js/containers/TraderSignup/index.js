// import React, { useState } from "react";
// import { Step, Steps, useSteps } from "chakra-ui-steps";
// import {
//     Flex,
//     Image,
//     Link,
//     Box,
//     VStack,
//     FormLabel,
//     FormControl,
//     FormErrorMessage,
//     Input,
//     Button,
//     Icon,
//     Heading,
//     useToast
// } from "@chakra-ui/react";
// import Logo from "../../../images/logo-black.png";
// import {
//     AiOutlineShop,
//     AiOutlineDollarCircle,
//     AiOutlineLike,
//     AiFillCheckCircle
// } from "react-icons/ai";
// import { Formik, Form, Field } from "formik";
// import {
//     validatePaymentEmails,
//     validateShop
// } from "../../utilities/validation";
// import ImageUploader from "react-images-upload";
// import { useHistory } from "react-router-dom";
// import { apiClient } from "../../utilities";
// import { DEFAULT_TOAST } from "../../constants";

// const shop_details = [
//     { name: "name", label: "Shop Name" },
//     { name: "street_no", label: "Street" },
//     { name: "city", label: "Town / City" },
//     { name: "PAN", label: "Registration no." }
// ];

// const payment_details = [
//     { name: "paypal_email", label: "Paypal email" },
//     { name: "stripe_email", label: "Stripe email" }
// ];

// const TraderSignup = () => {
//     var history = useHistory();
//     const toast = useToast(DEFAULT_TOAST);
//     const { nextStep, activeStep } = useSteps({
//         initialStep: 0
//     });
//     const [logo, setLogo] = useState(null);
//     const [auditId, setAuditId] = useState(null);

//     return (
//         <Flex
//             alignItems={{ base: "center", md: "flex-start" }}
//             direction="column"
//         >
//             <Link
//                 href="/"
//                 _focus={{ boxShadow: "none" }}
//                 outline="none"
//                 pos={{ base: "relative", md: "absolute" }}
//                 top={{ base: "0", md: "-50px" }}
//             >
//                 <Image
//                     src={Logo}
//                     w="200px"
//                     objectFit="cover"
//                     h={{ base: "20vh", md: "auto" }}
//                 />
//             </Link>
//             <Flex
//                 w="100%"
//                 h={{ base: "auto", md: "100vh" }}
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <Box
//                     maxW={{ base: "md", md: "xl" }}
//                     w="100%"
//                     m="20px"
//                     borderWidth="1px"
//                     borderRadius="lg"
//                     overflow="hidden"
//                     mt={{ base: "50px !important", md: "0 !important" }}
//                 >
//                     <Box p={{ base: "6", md: "10" }} w="100%">
//                         <VStack width="100%">
//                             <Steps colorScheme="red" activeStep={activeStep}>
//                                 <Step label="Store" icon={AiOutlineShop}>
//                                     <Formik
//                                         validate={validateShop}
//                                         initialValues={{
//                                             name: "",
//                                             street_no: "",
//                                             city: "",
//                                             PAN: "",
//                                             logo: null
//                                         }}
//                                         onSubmit={(values, actions) => {
//                                             // const data = new FormData();

//                                             // for (var key in values) {
//                                             //     data.append(key, values[key]);
//                                             // }

//                                             // data.append("logo", logo);
//                                             apiClient
//                                                 .get("/sanctum/csrf-cookie")
//                                                 .then(res =>
//                                                     apiClient
//                                                         .post(
//                                                             "/api/audit/request",
//                                                             {
//                                                                 table_name:
//                                                                     "shops",
//                                                                 action:
//                                                                     "create",
//                                                                 values: `name:${values.name},street_no:${values.street_no},city:${values.city},PAN:${values.PAN},logo:${logo}`
//                                                             }
//                                                         )
//                                                         .then(res => {
//                                                             setAuditId(
//                                                                 res.data
//                                                                     .request_id
//                                                             );
//                                                             toast({
//                                                                 title:
//                                                                     "Success",
//                                                                 description:
//                                                                     res.data
//                                                                         .message,
//                                                                 status:
//                                                                     "success"
//                                                             });
//                                                             actions.setSubmitting(
//                                                                 false
//                                                             );

//                                                             nextStep();
//                                                         })
//                                                         .catch(err => {
//                                                             console.log(
//                                                                 err.response
//                                                             );
//                                                             actions.setSubmitting(
//                                                                 false
//                                                             );

//                                                             toast({
//                                                                 title:
//                                                                     "Error while adding shop",
//                                                                 description: err
//                                                                     .response
//                                                                     .data.errors
//                                                                     ? Object.values(
//                                                                           err
//                                                                               .response
//                                                                               .data
//                                                                               .errors
//                                                                       )[0]
//                                                                     : "Error occured! Please try again!",
//                                                                 status: "error"
//                                                             });
//                                                         })
//                                                 )
//                                                 .catch(err => {
//                                                     toast({
//                                                         title:
//                                                             "Error while adding shop",
//                                                         description:
//                                                             "Error occured! Please try again!",
//                                                         status: "error"
//                                                     });
//                                                 });
//                                         }}
//                                     >
//                                         {props => (
//                                             <Form
//                                                 style={{
//                                                     width: "100%",
//                                                     marginTop: "50px"
//                                                 }}
//                                             >
//                                                 {shop_details.map(
//                                                     (
//                                                         { name, label },
//                                                         index
//                                                     ) => (
//                                                         <Field
//                                                             name={name}
//                                                             key={index}
//                                                         >
//                                                             {({
//                                                                 field,
//                                                                 form
//                                                             }) => (
//                                                                 <FormControl
//                                                                     isInvalid={
//                                                                         form
//                                                                             .errors[
//                                                                             name
//                                                                         ] &&
//                                                                         form
//                                                                             .touched[
//                                                                             name
//                                                                         ]
//                                                                     }
//                                                                     mb="10px !important"
//                                                                     className="flex-form"
//                                                                     isRequired
//                                                                 >
//                                                                     <FormLabel>
//                                                                         {label}
//                                                                     </FormLabel>
//                                                                     <Box w="100%">
//                                                                         <Input
//                                                                             {...field}
//                                                                             id={
//                                                                                 name
//                                                                             }
//                                                                             size="sm"
//                                                                         />
//                                                                         <FormErrorMessage fontSize="xs">
//                                                                             {
//                                                                                 form
//                                                                                     .errors[
//                                                                                     name
//                                                                                 ]
//                                                                             }
//                                                                         </FormErrorMessage>
//                                                                     </Box>
//                                                                 </FormControl>
//                                                             )}
//                                                         </Field>
//                                                     )
//                                                 )}
//                                                 <Field name="logo">
//                                                     {({ field, form }) => (
//                                                         <FormControl
//                                                             isInvalid={
//                                                                 form.errors
//                                                                     .logo &&
//                                                                 form.touched
//                                                                     .logo
//                                                             }
//                                                             mb="10px !important"
//                                                             className="flex-form"
//                                                             isRequired
//                                                         >
//                                                             <FormLabel>
//                                                                 Logo
//                                                             </FormLabel>
//                                                             <Box w="100%">
//                                                                 <ImageUploader
//                                                                     withPreview={
//                                                                         true
//                                                                     }
//                                                                     withIcon={
//                                                                         true
//                                                                     }
//                                                                     singleImage={
//                                                                         true
//                                                                     }
//                                                                     buttonText="Browse logo"
//                                                                     onChange={(
//                                                                         files,
//                                                                         urls
//                                                                     ) => {
//                                                                         setLogo(
//                                                                             files[0]
//                                                                         );
//                                                                         form.setFieldValue(
//                                                                             "logo",
//                                                                             files[0]
//                                                                                 ? files[0]
//                                                                                       .type
//                                                                                 : null
//                                                                         );
//                                                                     }}
//                                                                     imgExtension={[
//                                                                         ".jpg",
//                                                                         ".gif",
//                                                                         ".png",
//                                                                         ".gif"
//                                                                     ]}
//                                                                     maxFileSize={
//                                                                         5242880
//                                                                     }
//                                                                 />
//                                                                 <FormErrorMessage fontSize="xs">
//                                                                     {
//                                                                         form
//                                                                             .errors
//                                                                             .logo
//                                                                     }
//                                                                 </FormErrorMessage>
//                                                             </Box>
//                                                         </FormControl>
//                                                     )}
//                                                 </Field>
//                                                 <Flex
//                                                     w="100%"
//                                                     flexDir="column"
//                                                     justifyContent="center"
//                                                     alignItems="center"
//                                                 >
//                                                     <Button
//                                                         isLoading={
//                                                             props.isSubmitting
//                                                         }
//                                                         type="submit"
//                                                         fontSize="sm"
//                                                         p="0 40px !important"
//                                                         mt="10px !important"
//                                                         color="#fff"
//                                                         bg="secondary"
//                                                         _hover={{
//                                                             bg:
//                                                                 "var(--chakra-colors-primary) !important"
//                                                         }}
//                                                     >
//                                                         Continue
//                                                     </Button>
//                                                     <Link
//                                                         href="/"
//                                                         fontSize="xs"
//                                                         mt="10px"
//                                                         color="secondary"
//                                                         textDecor="underline"
//                                                         _hover={{
//                                                             color:
//                                                                 "var(--chakra-colors-primary) !important",
//                                                             textDecor:
//                                                                 "underline !important"
//                                                         }}
//                                                     >
//                                                         Skip for now
//                                                     </Link>
//                                                 </Flex>
//                                             </Form>
//                                         )}
//                                     </Formik>
//                                 </Step>
//                                 <Step
//                                     label="Payment"
//                                     icon={AiOutlineDollarCircle}
//                                 >
//                                     <Formik
//                                         validate={validatePaymentEmails}
//                                         initialValues={{
//                                             paypal_email: "",
//                                             stripe_email: ""
//                                         }}
//                                         onSubmit={(values, actions) => {
//                                             apiClient
//                                                 .get("/sanctum/csrf-cookie")
//                                                 .then(res =>
//                                                     apiClient
//                                                         .post(
//                                                             `/api/audit/request/${auditId}`,
//                                                             {
//                                                                 values: `paypal_email:${values.paypal_email},stripe_email:${values.stripe_email}`
//                                                             }
//                                                         )
//                                                         .then(res => {
//                                                             toast({
//                                                                 title:
//                                                                     "Success",
//                                                                 description:
//                                                                     "Shop has been created successfully!",
//                                                                 status:
//                                                                     "success"
//                                                             });
//                                                             actions.setSubmitting(
//                                                                 false
//                                                             );

//                                                             nextStep();
//                                                         })
//                                                         .catch(err => {
//                                                             console.log(
//                                                                 err.response
//                                                             );
//                                                             actions.setSubmitting(
//                                                                 false
//                                                             );

//                                                             toast({
//                                                                 title:
//                                                                     "Error while adding payment details",
//                                                                 description: err
//                                                                     .response
//                                                                     .data.errors
//                                                                     ? err
//                                                                           .response
//                                                                           .data
//                                                                           .errors
//                                                                     : "Error occured! Please try again!",
//                                                                 status: "error"
//                                                             });
//                                                         })
//                                                 )
//                                                 .catch(err => {
//                                                     toast({
//                                                         title:
//                                                             "Error while adding payment details",
//                                                         description:
//                                                             "Error occured! Please try again!",
//                                                         status: "error"
//                                                     });
//                                                 });
//                                         }}
//                                     >
//                                         {props => (
//                                             <Form
//                                                 style={{
//                                                     width: "100%",
//                                                     marginTop: "50px"
//                                                 }}
//                                             >
//                                                 {payment_details.map(
//                                                     (
//                                                         { name, label },
//                                                         index
//                                                     ) => (
//                                                         <Field
//                                                             name={name}
//                                                             key={index}
//                                                         >
//                                                             {({
//                                                                 field,
//                                                                 form
//                                                             }) => (
//                                                                 <FormControl
//                                                                     isInvalid={
//                                                                         form
//                                                                             .errors[
//                                                                             name
//                                                                         ] &&
//                                                                         form
//                                                                             .touched[
//                                                                             name
//                                                                         ]
//                                                                     }
//                                                                     mb="10px !important"
//                                                                     className="flex-form"
//                                                                     isRequired
//                                                                 >
//                                                                     <FormLabel>
//                                                                         {label}
//                                                                     </FormLabel>
//                                                                     <Box w="100%">
//                                                                         <Input
//                                                                             {...field}
//                                                                             id={
//                                                                                 name
//                                                                             }
//                                                                             size="sm"
//                                                                         />
//                                                                         <FormErrorMessage fontSize="xs">
//                                                                             {
//                                                                                 form
//                                                                                     .errors[
//                                                                                     name
//                                                                                 ]
//                                                                             }
//                                                                         </FormErrorMessage>
//                                                                     </Box>
//                                                                 </FormControl>
//                                                             )}
//                                                         </Field>
//                                                     )
//                                                 )}

//                                                 <Flex
//                                                     w="100%"
//                                                     justifyContent="center"
//                                                     mt="50px !important"
//                                                 >
//                                                     <Button
//                                                         isLoading={
//                                                             props.isSubmitting
//                                                         }
//                                                         type="submit"
//                                                         fontSize="sm"
//                                                         p="0 40px !important"
//                                                         color="#fff"
//                                                         bg="secondary"
//                                                         mt="10px !important"
//                                                         _hover={{
//                                                             bg:
//                                                                 "var(--chakra-colors-primary) !important"
//                                                         }}
//                                                     >
//                                                         Continue
//                                                     </Button>
//                                                 </Flex>
//                                             </Form>
//                                         )}
//                                     </Formik>
//                                 </Step>
//                                 <Step label="Complete" icon={AiOutlineLike}>
//                                     <VStack w="100%">
//                                         <Icon
//                                             as={AiFillCheckCircle}
//                                             color="green.400"
//                                             mt="50px"
//                                             fontSize="60px"
//                                         />
//                                         <Heading
//                                             as="h4"
//                                             fontSize="xl"
//                                             my="30px !important"
//                                         >
//                                             Your request has been sent!
//                                         </Heading>
//                                         <Button
//                                             mt="30px !important"
//                                             type="submit"
//                                             fontSize="sm"
//                                             p="0 40px !important"
//                                             color="#fff"
//                                             bg="secondary"
//                                             _hover={{
//                                                 bg:
//                                                     "var(--chakra-colors-primary) !important"
//                                             }}
//                                             onClick={() => history.push("/")}
//                                         >
//                                             Go to home
//                                         </Button>
//                                     </VStack>
//                                 </Step>
//                             </Steps>
//                         </VStack>
//                     </Box>
//                 </Box>
//             </Flex>
//         </Flex>
//     );
// };

// export default TraderSignup;
