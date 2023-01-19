import {
   TouchableOpacity,
   TouchableOpacityProps,
   Dimensions,
} from "react-native";

const WEEK_DAY = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
   Dimensions.get("screen").width / WEEK_DAY - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {}

export function HabitDay({ ...rest }: HabitDayProps) {
   return (
      <TouchableOpacity
         className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1"
         style={{ width: DAY_SIZE, height: DAY_SIZE }}
         activeOpacity={0.7}
         {...rest}
      />
   );
}
