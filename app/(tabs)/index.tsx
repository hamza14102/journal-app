import React, { useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { JournalEntry, JournalEntryProps } from "@/components/JournalEntry";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Sample journal entries for demonstration
const sampleEntries: JournalEntryProps[] = [
    {
        id: "1",
        date: "April 24, 2024",
        content:
            "I'm so thankful for this day... It was full of wonderful surprises and moments of joy.",
        mood: "good",
    },
    {
        id: "2",
        date: "April 23, 2024",
        content: "Met an old friend for lunch today.",
        mood: "moderate",
    },
    {
        id: "3",
        date: "April 21, 2024",
        content: "Busy day at work.",
        mood: "sad",
    },
    {
        id: "4",
        date: "April 20, 2024",
        content:
            "Feeling overwhelmed with all the tasks I need to complete this week.",
        mood: "bad",
    },
];

export default function HomeScreen() {
    const [entries] = useState<JournalEntryProps[]>(sampleEntries);
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                <ThemedText type="title">Journal</ThemedText>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push("/new-entry")}
                >
                    <IconSymbol name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {entries.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>
                        No journal entries yet. Tap the + button to create your
                        first entry.
                    </ThemedText>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <JournalEntry
                            id={item.id}
                            date={item.date}
                            content={item.content}
                            mood={item.mood}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#0a7ea4",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    listContainer: {
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
    },
});
