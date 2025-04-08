import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	VStack,
	CloseButton,
	Dialog,
	Portal
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode.jsx";
import { toaster } from "@/components/ui/toaster.jsx";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		toaster.create({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			type: success? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		toaster.create({
			title: success ? "Success" : "Error",
			description: success ? "Product updated successfully" : message,
			status: success ? "success" : "error",
			type: success? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

			<Box p={4}>
				<Heading as="h3" size="md" mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack gap={2}>
					{/* 👇 Dialog Trigger and Root FOR EDIT*/}
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<IconButton aria-label="Edit Product" colorPalette="cyan" variant="surface">
								<FaRegEdit />
							</IconButton>
						</Dialog.Trigger>

						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Update Product</Dialog.Title>
									</Dialog.Header>

									<Dialog.CloseTrigger asChild>
										<CloseButton position="absolute" right={3} top={3} />
									</Dialog.CloseTrigger>

									<Dialog.Body>
										<VStack spacing={4}>
											<Input
												placeholder="Product Name"
												name="name"
												value={updatedProduct.name}
												onChange={(e) =>
													setUpdatedProduct({ ...updatedProduct, name: e.target.value })
												}
											/>
											<Input
												placeholder="Price"
												name="price"
												type="number"
												value={updatedProduct.price}
												onChange={(e) =>
													setUpdatedProduct({ ...updatedProduct, price: e.target.value })
												}
											/>
											<Input
												placeholder="Image URL"
												name="image"
												value={updatedProduct.image}
												onChange={(e) =>
													setUpdatedProduct({ ...updatedProduct, image: e.target.value })
												}
											/>
										</VStack>
									</Dialog.Body>

									<Dialog.Footer>
										<Dialog.ActionTrigger asChild>
											<Button
												colorPalette="cyan"
												variant="subtle"
												onClick={() => handleUpdateProduct(product._id, updatedProduct)}
											>
												Update
											</Button>
										</Dialog.ActionTrigger>
										<Dialog.ActionTrigger asChild>
											<Button variant="outline">Cancel</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>

					{/* 👇 Dialog Trigger and Root FOR DELETE*/}

					<Dialog.Root>
						<Dialog.Trigger asChild>
							<IconButton
								aria-label="Delete Product"
								colorPalette="pink"
								variant="surface"
							>
								<MdDelete />
							</IconButton>
						</Dialog.Trigger>

						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Confirm Deletion</Dialog.Title>
									</Dialog.Header>

									<Dialog.CloseTrigger asChild>
										<CloseButton position="absolute" right={3} top={3} />
									</Dialog.CloseTrigger>

									<Dialog.Body>
										Are you sure you want to delete <strong>{product.name}</strong>?
									</Dialog.Body>

									<Dialog.Footer>
										<Dialog.ActionTrigger asChild>
											<Button
												colorPalette="pink"
												variant="solid"
												onClick={() => handleDeleteProduct(product._id)}
											>
												Delete
											</Button>
										</Dialog.ActionTrigger>
										<Dialog.ActionTrigger asChild>
											<Button variant="outline">Cancel</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>

				</HStack>
			</Box>
		</Box>
	);
};

export default ProductCard;
