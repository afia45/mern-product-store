import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode.jsx"
import { Link } from "react-router-dom";

import { FiPlusSquare } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					textStyle="lg"
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient="to-r" gradientFrom="cyan.400" gradientTo="blue.500"
					bgClip={"text"}
				//bgGradient={"linear(to-r, cyan.400, blue.500)"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<FiPlusSquare fontSize={20} />
						</Button>
					</Link>
					{<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>}
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;