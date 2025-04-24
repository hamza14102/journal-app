import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { MoodType, moodEmojis, moodLabels } from "./JournalEntry";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface MoodSelectorProps {
    selectedMood: MoodType;
    onSelectMood: (mood: MoodType) => void;
}

export function MoodSelector({
    selectedMood,
    onSelectMood,
}: MoodSelectorProps) {
    const colorScheme = useColorScheme() ?? "light";
    const moodTypes: MoodType[] = ["good", "moderate", "sad", "bad"];

    return (
        <View style={styles.container}>
            <ThemedText style={styles.label}>Mood</ThemedText>
            <View style={styles.moodsContainer}>
                {moodTypes.map((mood) => (
                    <TouchableOpacity
                        key={mood}
                        style={[
                            styles.moodItem,
                            selectedMood === mood && {
                                backgroundColor:
                                    colorScheme === "light"
                                        ? "rgba(10, 126, 164, 0.1)"
                                        : "rgba(255, 255, 255, 0.2)",
                                borderColor: Colors[colorScheme].tint,
                            },
                        ]}
                        onPress={() => onSelectMood(mood)}
                    >
                        <ThemedText style={styles.emoji}>
                            {moodEmojis[mood]}
                        </ThemedText>
                        <ThemedText style={styles.moodText}>
                            {moodLabels[mood]}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    moodsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    moodItem: {
        width: "48%",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    emoji: {
        fontSize: 28,
        marginBottom: 5,
    },
    moodText: {
        fontSize: 14,
    },
});
