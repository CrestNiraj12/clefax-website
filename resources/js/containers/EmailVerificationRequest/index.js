import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Link,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Logo from "../../../images/logo-black.png";
import { DEFAULT_TOAST, SALT, TEMPLATE_BASIC } from "../../constants";
import { handleMailSend } from "../../utilities/mail";
import md5 from "md5";

const mapStateToProps = state => ({
    auth: state.auth
});

const EmailVerification = ({ auth }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const toast = useToast(DEFAULT_TOAST);

    useEffect(() => {
        if (!auth.logged_in && auth.user) {
            if (auth.user.email_verified_at) {
                toast({
                    title: "Account already verified",
                    description: "Your account is already verified!",
                    status: "info"
                });
                history.push("/");
            } else {
                toast({
                    title: "Verify your account",
                    description: "You need to verify your email address first!",
                    status: "info"
                });
                sendVerificationMail();
            }
        } else if (auth.logged_in && auth.user) {
            toast({
                title: "Account already verified",
                description: "Your account is already verified!",
                status: "info"
            });
            history.push("/");
        } else history.push("/login");
    }, [auth]);

    const sendVerificationMail = (resend = false) => {
        setLoading(true);
        const hash = md5(auth.user.email + SALT + auth.user.fullname);
        const link = `http://localhost:3000/user/verify/?token=${hash}`;
        const message = `<p>Please click <a href="${link}">here</a> or the given link below to verify your email!</p><p><a href="${link}">${link}</a></p>`;
        handleMailSend(
            TEMPLATE_BASIC,
            "Email verification link",
            auth.user.fullname,
            auth.user.email,
            {
                message: message,
                from_name: "Clefax E-Shop",
                reply_to: null
            }
        );
        if (resend)
            toast({
                title: "Email resend success",
                description:
                    "Your email verification link has been sent successfully!",
                status: "success"
            });
        setLoading(false);
    };

    return (
        <Flex
            alignItems={{ base: "center", md: "flex-start" }}
            direction="column"
        >
            <Link
                href="/"
                _focus={{ boxShadow: "none" }}
                outline="none"
                pos={{ base: "relative", md: "absolute" }}
                top={{ base: "0", md: "-50px" }}
            >
                <Image
                    src={Logo}
                    w="200px"
                    objectFit="cover"
                    h={{ base: "20vh", md: "auto" }}
                />
            </Link>
            <Flex
                w="100%"
                h={{ base: "auto", md: "100vh" }}
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    maxW={{ base: "md", md: "xl" }}
                    w="100%"
                    m="20px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={{ base: "50px !important", md: "0 !important" }}
                    textAlign="center"
                    p={{ base: "30px 10px", md: "50px" }}
                >
                    <Icon as={AiFillCheckCircle} color="green" fontSize="3em" />
                    <Heading as="h6" fontSize="lg" mt="20px">
                        Email verification link sent!
                    </Heading>
                    <Text mt="10px">
                        Please check your email account and click on the link to
                        verify your email address.
                    </Text>
                    <Button
                        p="20px !important"
                        mt="20px"
                        fontSize="sm"
                        onClick={() => sendVerificationMail(true)}
                    >
                        {loading ? <Spinner color="primary" /> : "Resend link"}
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
};

export default connect(mapStateToProps)(EmailVerification);
