import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Switch,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
            <View style={styles.sectionContent}>{children}</View>
        </View>
    );
}

interface SettingsToggleProps {
    label: string;
    description?: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
}

function SettingsToggle({
    label,
    description,
    value,
    onValueChange,
}: SettingsToggleProps) {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingLabel}>{label}</ThemedText>
                {description && (
                    <ThemedText style={styles.settingDescription}>
                        {description}
                    </ThemedText>
                )}
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: "#767577",
                    true: Colors[colorScheme].tint,
                }}
                thumbColor="#fff"
            />
        </View>
    );
}

interface SettingsButtonProps {
    label: string;
    icon?: string;
    onPress: () => void;
}

function SettingsButton({ label, icon, onPress }: SettingsButtonProps) {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <TouchableOpacity style={styles.settingButtonRow} onPress={onPress}>
            <ThemedText style={styles.settingLabel}>{label}</ThemedText>
            {icon ? (
                <IconSymbol
                    name={icon as any}
                    size={20}
                    color={Colors[colorScheme].icon}
                />
            ) : (
                <IconSymbol
                    name="chevron.right"
                    size={20}
                    color={Colors[colorScheme].icon}
                />
            )}
        </TouchableOpacity>
    );
}

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [biometricLockEnabled, setBiometricLockEnabled] = useState(false);

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                <ThemedText type="title">Settings</ThemedText>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SettingsSection title="Appearance">
                    <SettingsToggle
                        label="Dark Mode"
                        description="Use dark theme for the app"
                        value={darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                    />
                </SettingsSection>

                <SettingsSection title="Notifications">
                    <SettingsToggle
                        label="Enable Notifications"
                        description="Receive notifications from the app"
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />

                    <SettingsToggle
                        label="Daily Journal Reminder"
                        description="Receive a reminder to journal daily"
                        value={reminderEnabled}
                        onValueChange={setReminderEnabled}
                    />
                </SettingsSection>

                <SettingsSection title="Privacy">
                    <SettingsToggle
                        label="Biometric Lock"
                        description="Require authentication to access the app"
                        value={biometricLockEnabled}
                        onValueChange={setBiometricLockEnabled}
                    />
                </SettingsSection>

                <SettingsSection title="Data">
                    <SettingsButton
                        label="Export Journal Entries"
                        onPress={() => {
                            /* Export functionality would go here */
                        }}
                    />
                    <SettingsButton
                        label="Backup & Restore"
                        onPress={() => {
                            /* Backup functionality would go here */
                        }}
                    />
                </SettingsSection>

                <SettingsSection title="About">
                    <SettingsButton
                        label="Version"
                        icon="chevron.right"
                        onPress={() => {
                            /* Show version info */
                        }}
                    />
                    <SettingsButton
                        label="Privacy Policy"
                        onPress={() => {
                            /* Show privacy policy */
                        }}
                    />
                    <SettingsButton
                        label="Terms of Service"
                        onPress={() => {
                            /* Show terms of service */
                        }}
                    />
                </SettingsSection>
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
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    sectionContent: {
        borderRadius: 8,
        overflow: "hidden",
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
    },
    settingButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
    },
    settingTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    settingLabel: {
        fontSize: 16,
    },
    settingDescription: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
});
