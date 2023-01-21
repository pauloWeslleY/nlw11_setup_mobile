import { useState, useEffect } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import dayjs from "dayjs";

import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";

interface Params {
   date: string;
}

interface DayInfoProps {
   completedHabits: string[];
   possibleHabits: Array<{
      id: string;
      title: string;
   }>;
}

export function Habit() {
   const [loading, setLoading] = useState(true);
   const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
   const [completedHabits, setCompletedHabits] = useState<string[]>([]);

   const route = useRoute();
   const { date } = route.params as Params;

   const parseDate = dayjs(date);
   const dayOfWeek = parseDate.format("dddd");
   const dayAndMonth = parseDate.format("DD/MM");

   async function fetchHabits() {
      try {
         setLoading(true);

         const response = await api.get("/day", { params: { date } });
         setDayInfo(response.data);
         setCompletedHabits(response.data.completedHabits);
      } catch (error) {
         console.log(error);
         Alert.alert("Ops", "not found habits information");
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchHabits();
   }, []);

   if (loading) {
      return <Loading />;
   }

   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
         >
            <BackButton />

            <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
               {dayOfWeek}
            </Text>
            <Text className="text-white font-extrabold text-3xl">
               {dayAndMonth}
            </Text>

            <ProgressBar progress={75} />

            <View className="mt-6">
               {dayInfo?.possibleHabits &&
                  dayInfo?.possibleHabits.map((habit) => (
                     <CheckBox
                        key={habit.id}
                        title={habit.title}
                        checked={completedHabits.includes(habit.id)}
                     />
                  ))}
            </View>
         </ScrollView>
      </View>
   );
}
