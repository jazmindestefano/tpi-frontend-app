import { useMediaQuery } from "react-responsive";

const useCustomMediaQuery = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return {
        isDesktop,
    };
}

export default useCustomMediaQuery;