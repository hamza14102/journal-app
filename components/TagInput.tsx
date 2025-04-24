import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface TagInputProps {
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (index: number) => void;
}

export function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const colorScheme = useColorScheme() ?? "light";

    const handleAddTag = () => {
        if (inputValue.trim() !== "") {
            onAddTag(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.label}>Tags</ThemedText>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text }]}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Add tag (e.g. 'gratitude')"
                    placeholderTextColor={Colors[colorScheme].tabIconDefault}
                    onSubmitEditing={handleAddTag}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddTag}
                >
                    <IconSymbol
                        name="plus"
                        size={20}
                        color={Colors[colorScheme].tint}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                    <ThemedView key={index} style={styles.tag}>
                        <View style={styles.tagContent}>
                            <IconSymbol
                                name="tag"
                                size={16}
                                color={Colors[colorScheme].icon}
                                style={styles.tagIcon}
                            />
                            <ThemedText style={styles.tagText}>
                                {tag}
                            </ThemedText>
                            <TouchableOpacity
                                onPress={() => onRemoveTag(index)}
                                hitSlop={{
                                    top: 10,
                                    right: 10,
                                    bottom: 10,
                                    left: 10,
                                }}
                            >
                                <ThemedText style={styles.removeTag}>
                                    ✕
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    </ThemedView>
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 44,
        fontSize: 16,
    },
    addButton: {
        padding: 5,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    tagIcon: {
        marginRight: 5,
    },
    tagText: {
        fontSize: 14,
        marginRight: 5,
    },
    removeTag: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 4,
    },
});
