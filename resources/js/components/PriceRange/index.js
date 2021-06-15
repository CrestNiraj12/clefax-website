import { Box, Text } from "@chakra-ui/react";
import { floor } from "lodash";
import { Handle, Range } from "rc-slider";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from "react";
import { getFinalPrice } from "../../utilities";

const PriceRange = forwardRef(
    (
        {
            setLoading,
            data,
            setPriceRange,
            handleFilter,
            fontSize = "18px",
            height = 10,
            margin = 0
        },
        ref
    ) => {
        const [range, setRange] = useState([0, 1000]);
        const [value, setValue] = useState([0, 1000]);

        useEffect(() => {
            if (data.length > 0) {
                setLoading(true);
                const min = floor(
                    getFinalPrice(
                        data.reduce((a, b) =>
                            getFinalPrice(a) < getFinalPrice(b) ? a : b
                        )
                    )
                );
                const max = data.reduce((a, b) => (b.price > a.price ? b : a))
                    .price;
                setRange([min, max]);
                setValue([min, max]);
                setPriceRange([min, max]);
                setLoading(false);
            }
        }, [data]);

        const handleChange = v => {
            setLoading(true);
            setValue(v);
            setPriceRange(v);
            handleFilter(v);
            setLoading(false);
        };

        useImperativeHandle(ref, () => ({
            resetRange() {
                setValue(range);
            }
        }));

        return (
            <Box m={margin}>
                <Range
                    allowCross={false}
                    min={range[0]}
                    max={range[1]}
                    value={value}
                    handle={props => (
                        <SliderHandle {...props} height={height} />
                    )}
                    railStyle={{
                        height,
                        margin: `0 -${height}`,
                        backgroundColor: "#e1e1e1"
                    }}
                    trackStyle={{
                        height: `${height} !important`
                    }}
                    style={{
                        margin: `0 ${height}`
                    }}
                    onChange={handleChange}
                />
                <Text color="gray" fontSize={fontSize} mt="20px">
                    Range: £{value[0]} - £{value[1]}
                </Text>
            </Box>
        );
    }
);

const SliderHandle = ({ height, ...props }) => {
    return (
        <Handle
            {...props}
            style={{
                borderColor: "var(--chakra-colors-secondary)",
                borderRadius: 0,
                borderWidth: 5,
                height: height * 2,
                width: height * 2,
                "&:active": {
                    borderColor: "var(--chakra-colors-secondary)"
                },
                "&:hover": {
                    backgroundColor: "var(--chakra-colors-secondary)"
                }
            }}
        />
    );
};

export default PriceRange;
