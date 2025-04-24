import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MoodSelector } from "@/components/MoodSelector";
import { TagInput } from "@/components/TagInput";
import { MoodType } from "@/components/JournalEntry";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";

export default function NewEntryScreen() {
    const [journalContent, setJournalContent] = useState("");
    const [selectedMood, setSelectedMood] = useState<MoodType>("moderate");
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleAddTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleRemoveTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const handleSave = () => {
        // In a real app, save the entry to storage
        console.log("Saving entry:", { journalContent, selectedMood, tags });
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

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

                    <ThemedText type="title">New Entry</ThemedText>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <ThemedText style={styles.saveButtonText}>
                            Save
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                <ThemedText style={styles.dateText}>
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </ThemedText>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Textarea
                        size="md"
                        isInvalid={false}
                        isDisabled={false}
                        className="w-full"
                        style={styles.textareaContainer}
                    >
                        <TextareaInput
                            placeholder="How are you feeling today?"
                            value={journalContent}
                            onChangeText={setJournalContent}
                            multiline
                            className="min-h-[200px] text-base"
                        />
                    </Textarea>

                    <MoodSelector
                        selectedMood={selectedMood}
                        onSelectMood={setSelectedMood}
                    />

                    <TagInput
                        tags={tags}
                        onAddTag={handleAddTag}
                        onRemoveTag={handleRemoveTag}
                    />

                    <View style={styles.actionButtonsContainer}>
                        <Button
                            action="primary"
                            variant="solid"
                            size="lg"
                            onPress={handleSave}
                            style={styles.mainButton}
                        >
                            <ButtonText>Save Entry</ButtonText>
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    saveButton: {
        padding: 5,
    },
    saveButtonText: {
        color: "#0a7ea4",
        fontSize: 16,
        fontWeight: "600",
    },
    dateText: {
        fontSize: 14,
        color: "#888",
        marginTop: 8,
    },
    keyboardAvoidView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    textareaContainer: {
        marginVertical: 16,
    },
    actionButtonsContainer: {
        marginTop: 24,
        marginBottom: 40,
    },
    mainButton: {
        width: "100%",
    },
});
