import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MoodType, moodEmojis, moodLabels } from "@/components/JournalEntry";

// Sample entries data to simulate fetching an entry
const sampleEntries = {
    "1": {
        id: "1",
        date: "April 24, 2024",
        content:
            "I'm so thankful for this day! It was full of wonderful surprises and moments of joy. I had a great lunch with Sarah, and we caught up after so long. The weather was perfect - sunny but not too hot. In the evening, I finished reading that book I've been working through for weeks. Overall, a perfect day to be grateful for.",
        mood: "good" as MoodType,
        tags: ["gratitude", "friends"],
    },
    "2": {
        id: "2",
        date: "April 23, 2024",
        content:
            "Met an old friend for lunch today. It was nice to catch up, but I feel a bit tired after socializing.",
        mood: "moderate" as MoodType,
        tags: ["socializing"],
    },
    "3": {
        id: "3",
        date: "April 21, 2024",
        content:
            "Busy day at work. Had three meetings back to back and barely had time for lunch. I need to find a better way to manage my calendar.",
        mood: "sad" as MoodType,
        tags: ["work", "stress"],
    },
    "4": {
        id: "4",
        date: "April 20, 2024",
        content:
            "Feeling overwhelmed with all the tasks I need to complete this week. I don't think I'll manage to finish everything on time.",
        mood: "bad" as MoodType,
        tags: ["stress", "anxiety", "work"],
    },
};

export default function EntryDetailScreen() {
    const { id } = useLocalSearchParams();
    const entryId = typeof id === "string" ? id : "1";
    const entry = sampleEntries[entryId as keyof typeof sampleEntries];
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleEdit = () => {
        // In a real app, navigate to edit screen with the entry data
        console.log("Edit entry:", entry);
    };

    const handleDelete = () => {
        // In a real app, delete the entry
        console.log("Delete entry:", entry);
        router.back();
    };

    if (!entry) {
        return (
            <ThemedView style={styles.container}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol
                            name="chevron.left"
                            color="#000"
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyState}>
                    <ThemedText style={styles.emptyText}>
                        Entry not found
                    </ThemedText>
                </View>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol
                            name="chevron.left"
                            color="#000"
                            size={28}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleEdit}
                        >
                            <IconSymbol name="edit" size={22} color="#555" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleDelete}
                        >
                            <IconSymbol name="trash" size={22} color="#555" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <ThemedText style={styles.date}>{entry.date}</ThemedText>

                <View style={styles.moodContainer}>
                    <ThemedText style={styles.emoji}>
                        {moodEmojis[entry.mood]}
                    </ThemedText>
                    <ThemedText style={styles.moodLabel}>
                        {moodLabels[entry.mood]}
                    </ThemedText>
                </View>

                <ThemedText style={styles.content}>{entry.content}</ThemedText>

                {entry.tags && entry.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                        <ThemedText style={styles.tagsLabel}>Tags:</ThemedText>
                        <View style={styles.tagsList}>
                            {entry.tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <ThemedText style={styles.tagText}>
                                        #{tag}
                                    </ThemedText>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        padding: 5,
    },
    headerActions: {
        flexDirection: "row",
    },
    actionButton: {
        padding: 8,
        marginLeft: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    date: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 12,
    },
    moodContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    emoji: {
        fontSize: 24,
        marginRight: 8,
    },
    moodLabel: {
        fontSize: 18,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    tagsContainer: {
        marginTop: 16,
    },
    tagsLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    tagsList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 14,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
    },
});
