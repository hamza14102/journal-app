import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export type MoodType = "good" | "moderate" | "sad" | "bad";

export interface JournalEntryProps {
    id: string;
    date: string;
    content: string;
    mood: MoodType;
}

export const moodEmojis: Record<MoodType, string> = {
    good: "😊",
    moderate: "😐",
    sad: "😔",
    bad: "😢",
};

export const moodLabels: Record<MoodType, string> = {
    good: "Good Mood",
    moderate: "Moderate",
    sad: "Sad",
    bad: "Bad Day",
};

export function JournalEntry({ id, date, content, mood }: JournalEntryProps) {
    return (
        <Link href={`/entry/${id}`} asChild>
            <TouchableOpacity activeOpacity={0.7}>
                <ThemedView style={styles.container}>
                    <ThemedText type="subtitle" style={styles.date}>
                        {date}
                    </ThemedText>
                    <View style={styles.moodContainer}>
                        <ThemedText style={styles.emoji}>
                            {moodEmojis[mood]}
                        </ThemedText>
                        <ThemedText style={styles.moodLabel}>
                            {moodLabels[mood]}
                        </ThemedText>
                    </View>
                    <ThemedText numberOfLines={2} style={styles.content}>
                        {content}
                    </ThemedText>
                </ThemedView>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    date: {
        marginBottom: 8,
        fontSize: 18,
    },
    moodContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    emoji: {
        fontSize: 20,
        marginRight: 8,
    },
    moodLabel: {
        fontSize: 16,
    },
    content: {
        fontSize: 16,
        lineHeight: 22,
    },
});
