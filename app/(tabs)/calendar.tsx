import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// Calendar data
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Sample moods for specific dates
const moodByDate: Record<string, string> = {
    "2024-04-20": "sad",
    "2024-04-21": "sad",
    "2024-04-23": "moderate",
    "2024-04-24": "good",
};

export default function CalendarScreen() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [currentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay();

    // Generate calendar days
    const generateCalendarDays = () => {
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Add cells for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const getMoodColor = (day: number) => {
        if (!day) return "transparent";

        const dateString = `${year}-${String(month + 1).padStart(
            2,
            "0"
        )}-${String(day).padStart(2, "0")}`;
        const mood = moodByDate[dateString];

        if (!mood) return "transparent";

        switch (mood) {
            case "good":
                return "#FFD700"; // gold
            case "moderate":
                return "#87CEEB"; // light blue
            case "sad":
                return "#FFA07A"; // light salmon
            case "bad":
                return "#FF6347"; // tomato
            default:
                return "transparent";
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                <ThemedText type="title">Calendar</ThemedText>
            </View>

            <View style={styles.calendarContainer}>
                {/* Month and year header */}
                <ThemedText style={styles.monthYearHeader}>
                    {monthNames[month]} {year}
                </ThemedText>

                {/* Days of week header */}
                <View style={styles.daysOfWeekHeader}>
                    {daysOfWeek.map((day) => (
                        <ThemedText key={day} style={styles.dayOfWeekText}>
                            {day}
                        </ThemedText>
                    ))}
                </View>

                {/* Calendar grid */}
                <View style={styles.calendarGrid}>
                    {calendarDays.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dayCell}
                            disabled={!day}
                            onPress={() => {
                                if (day) {
                                    const dateString = `${year}-${String(
                                        month + 1
                                    ).padStart(2, "0")}-${String(day).padStart(
                                        2,
                                        "0"
                                    )}`;
                                    setSelectedDate(
                                        dateString === selectedDate
                                            ? null
                                            : dateString
                                    );
                                }
                            }}
                        >
                            {day ? (
                                <>
                                    <ThemedText
                                        style={[
                                            styles.dayText,
                                            selectedDate ===
                                                `${year}-${String(
                                                    month + 1
                                                ).padStart(2, "0")}-${String(
                                                    day
                                                ).padStart(2, "0")}` &&
                                                styles.selectedDayText,
                                        ]}
                                    >
                                        {day}
                                    </ThemedText>
                                    <View
                                        style={[
                                            styles.moodDot,
                                            {
                                                backgroundColor:
                                                    getMoodColor(day),
                                            },
                                        ]}
                                    />
                                </>
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {selectedDate && (
                <View style={styles.selectedDateInfo}>
                    <ThemedText style={styles.selectedDateText}>
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </ThemedText>
                    {moodByDate[selectedDate] && (
                        <ThemedText style={styles.moodText}>
                            Mood:{" "}
                            {moodByDate[selectedDate].charAt(0).toUpperCase() +
                                moodByDate[selectedDate].slice(1)}
                        </ThemedText>
                    )}
                    <TouchableOpacity
                        style={styles.viewEntryButton}
                        onPress={() => {
                            /* Navigate to entry for this date */
                        }}
                    >
                        <ThemedText style={styles.viewEntryButtonText}>
                            {moodByDate[selectedDate]
                                ? "View Entry"
                                : "Add Entry"}
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    calendarContainer: {
        padding: 16,
    },
    monthYearHeader: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 16,
    },
    daysOfWeekHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    dayOfWeekText: {
        width: 40,
        textAlign: "center",
        fontWeight: "600",
    },
    calendarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    dayCell: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 4,
    },
    dayText: {
        textAlign: "center",
    },
    selectedDayText: {
        fontWeight: "bold",
    },
    moodDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 2,
    },
    selectedDateInfo: {
        padding: 16,
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    moodText: {
        fontSize: 14,
        marginBottom: 12,
    },
    viewEntryButton: {
        backgroundColor: "#0a7ea4",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    viewEntryButtonText: {
        color: "white",
        fontWeight: "600",
    },
});
