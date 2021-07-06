import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useToast
} from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { apiClient } from "../../utilities";
import { setAuth, setCartProducts, setWishlistProducts } from "../../actions";
import { DEFAULT_TOAST } from "../../constants";

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth)),
    setCartProducts: cart => dispatch(setCartProducts(cart)),
    setWishlistProducts: wishlist => dispatch(setWishlistProducts(wishlist))
});

const Logout = ({
    isOpen,
    onClose,
    setAuth,
    setCartProducts,
    setWishlistProducts
}) => {
    const toast = useToast(DEFAULT_TOAST);

    const handleLogout = () => {
        apiClient
            .post("/api/logout")
            .then(res => {
                localStorage.setItem("auth", false);
                localStorage.removeItem("user");
                setAuth({ logged_in: false, user: null });

                if (localStorage.getItem("wishlist")) {
                    const ps = JSON.parse(localStorage.getItem("wishlist"));
                    setWishlistProducts(ps);
                } else setWishlistProducts([]);

                if (localStorage.getItem("cart")) {
                    const stored = JSON.parse(localStorage.getItem("cart"));
                    setCartProducts(stored);
                } else setCartProducts([]);

                toast({
                    title: "Logout success",
                    description: res.data.message,
                    status: "success"
                });
                onClose();
            })
            .catch(err => console.log(err));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Logout</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure you want to logout?</ModalBody>

                <ModalFooter>
                    <Button
                        bg="primary"
                        color="#fff"
                        fontSize="sm"
                        textTransform="none"
                        p="0 20px !important"
                        mr={3}
                        onClick={onClose}
                        _hover={{
                            bg: "var(--chakra-colors-gray) !important"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="ghost"
                        fontSize="sm"
                        textTransform="none"
                        p="0 20px !important"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default connect(null, mapDispatchToProps)(Logout);
