import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { moodEmojis, MoodType } from "@/components/JournalEntry";

// Sample data for charts
const journalingFrequencyData = [
    { month: "Nov", count: 8 },
    { month: "Dec", count: 12 },
    { month: "Jan", count: 15 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 22 },
    { month: "Apr", count: 28 },
];

const moodDistributionData = [
    { mood: "good", percentage: 60 },
    { mood: "moderate", percentage: 25 },
    { mood: "sad", percentage: 10 },
    { mood: "bad", percentage: 5 },
];

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 40; // 20px padding on each side
const chartHeight = 200;
const barSpacing = 8;

export default function StatsScreen() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? "light";
    const textColor = Colors[colorScheme].text;

    // Find maximum value for frequency chart scaling
    const maxFrequency = Math.max(
        ...journalingFrequencyData.map((item) => item.count)
    );

    // Generate mood bar colors
    const getMoodBarColor = (mood: string) => {
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
                return "#CCCCCC";
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top || 44 }]}>
                <ThemedText type="title">Statistics</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.chartContainer}>
                    <ThemedText style={styles.chartTitle}>
                        Journaling Frequency
                    </ThemedText>

                    {/* Line chart for journaling frequency */}
                    <View style={styles.lineChartContainer}>
                        {/* Y-axis labels (left side) */}
                        <View style={styles.yAxisLabels}>
                            {[0, maxFrequency / 2, maxFrequency].map(
                                (value, index) => (
                                    <ThemedText
                                        key={index}
                                        style={styles.axisLabel}
                                    >
                                        {Math.round(value)}
                                    </ThemedText>
                                )
                            )}
                        </View>

                        {/* Chart area */}
                        <View style={styles.chartArea}>
                            {/* Background grid lines */}
                            <View style={[styles.gridLine, { bottom: 0 }]} />
                            <View
                                style={[
                                    styles.gridLine,
                                    { bottom: chartHeight / 2 },
                                ]}
                            />
                            <View
                                style={[
                                    styles.gridLine,
                                    { bottom: chartHeight },
                                ]}
                            />

                            {/* Frequency line with dots */}
                            <View style={styles.lineChartLine}>
                                {journalingFrequencyData.map((data, index) => {
                                    const x =
                                        index *
                                        ((chartWidth - 30) /
                                            (journalingFrequencyData.length -
                                                1));
                                    const y =
                                        chartHeight *
                                        (data.count / maxFrequency);

                                    // Draw connection line to next point
                                    const nextPoint =
                                        journalingFrequencyData[index + 1];
                                    const hasNextPoint =
                                        index <
                                        journalingFrequencyData.length - 1;

                                    return (
                                        <React.Fragment key={index}>
                                            {/* Data point (dot) */}
                                            <View
                                                style={[
                                                    styles.dataPoint,
                                                    { left: x, bottom: y },
                                                ]}
                                            />

                                            {/* Line to next point */}
                                            {hasNextPoint && (
                                                <View
                                                    style={[
                                                        styles.lineSegment,
                                                        {
                                                            left: x,
                                                            bottom: y,
                                                            width:
                                                                (chartWidth -
                                                                    30) /
                                                                (journalingFrequencyData.length -
                                                                    1),
                                                            height: 2,
                                                            transform: [
                                                                {
                                                                    rotate: `${
                                                                        Math.atan2(
                                                                            ((nextPoint.count -
                                                                                data.count) /
                                                                                maxFrequency) *
                                                                                chartHeight,
                                                                            (chartWidth -
                                                                                30) /
                                                                                (journalingFrequencyData.length -
                                                                                    1)
                                                                        ) *
                                                                        (180 /
                                                                            Math.PI)
                                                                    }deg`,
                                                                },
                                                            ],
                                                            transformOrigin:
                                                                "left bottom",
                                                        },
                                                    ]}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </View>

                            {/* X-axis labels (months) */}
                            <View style={styles.xAxisLabels}>
                                {journalingFrequencyData.map((data, index) => {
                                    const x =
                                        index *
                                        ((chartWidth - 30) /
                                            (journalingFrequencyData.length -
                                                1));
                                    return (
                                        <ThemedText
                                            key={index}
                                            style={[
                                                styles.monthLabel,
                                                { left: x - 10 }, // Center the label
                                            ]}
                                        >
                                            {data.month}
                                        </ThemedText>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.chartContainer}>
                    <ThemedText style={styles.chartTitle}>
                        Mood Over Time
                    </ThemedText>

                    {/* Mood distribution bar chart */}
                    <View style={styles.moodChartContainer}>
                        {moodDistributionData.map((data, index) => (
                            <View key={index} style={styles.moodBarContainer}>
                                <View style={styles.moodLabelContainer}>
                                    <ThemedText style={styles.emoji}>
                                        {moodEmojis[data.mood as MoodType]}
                                    </ThemedText>
                                    <ThemedText style={styles.moodLabel}>
                                        {data.mood.charAt(0).toUpperCase() +
                                            data.mood.slice(1)}
                                    </ThemedText>
                                </View>
                                <View style={styles.barContainer}>
                                    <View
                                        style={[
                                            styles.moodBar,
                                            {
                                                width: `${data.percentage}%`,
                                                backgroundColor:
                                                    getMoodBarColor(data.mood),
                                            },
                                        ]}
                                    />
                                    <ThemedText style={styles.percentageLabel}>
                                        {data.percentage}%
                                    </ThemedText>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.statsFooter}>
                    <ThemedText style={styles.statsNote}>
                        Your statistics are based on{" "}
                        {journalingFrequencyData.reduce(
                            (sum, item) => sum + item.count,
                            0
                        )}{" "}
                        journal entries.
                    </ThemedText>
                </View>
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
    chartContainer: {
        marginBottom: 30,
        backgroundColor: "transparent",
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    lineChartContainer: {
        height: chartHeight + 50, // Extra space for x-axis labels
        flexDirection: "row",
    },
    yAxisLabels: {
        width: 30,
        height: chartHeight,
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingRight: 5,
    },
    axisLabel: {
        fontSize: 12,
        color: "#888",
    },
    chartArea: {
        flex: 1,
        height: chartHeight,
        position: "relative",
    },
    gridLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    lineChartLine: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: chartHeight,
    },
    dataPoint: {
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#0a7ea4",
        marginLeft: -4,
        marginBottom: -4,
    },
    lineSegment: {
        position: "absolute",
        backgroundColor: "#0a7ea4",
    },
    xAxisLabels: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -30,
        height: 20,
    },
    monthLabel: {
        position: "absolute",
        fontSize: 12,
        color: "#888",
        width: 20,
        textAlign: "center",
    },
    moodChartContainer: {
        marginTop: 10,
    },
    moodBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    moodLabelContainer: {
        width: 90,
        flexDirection: "row",
        alignItems: "center",
    },
    emoji: {
        fontSize: 18,
        marginRight: 8,
    },
    moodLabel: {
        fontSize: 14,
    },
    barContainer: {
        flex: 1,
        height: 18,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 9,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
    },
    moodBar: {
        height: "100%",
        borderRadius: 9,
    },
    percentageLabel: {
        position: "absolute",
        right: 10,
        fontSize: 12,
        fontWeight: "600",
    },
    statsFooter: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.1)",
    },
    statsNote: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#888",
        textAlign: "center",
    },
});
