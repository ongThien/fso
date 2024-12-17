import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import useRepository from "../hooks/useRepository";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data!</Text>;

  const { repository } = data;
  const reviews = repository && repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

  if (reviews.length === 0) {
    return (
      <View>
        <RepositoryInfo repository={repository} />
        <View style={styles.reviewItem.container}>
          <Text>This repo has no review...</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem key={item.id} review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const RepositoryInfo = ({ repository }) => {

  return (
    <View style={{ marginBottom: 16 }}>
      <RepositoryItem item={repository} />
      <View style={{ backgroundColor: theme.colors.white, padding: 8 }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? theme.colors.backgroundPrimary : theme.colors.primary }
          ]}
          onPress={() => Linking.openURL(repository.url)}>
          <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>Open in Github</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {

  const { createdAt, rating, text, user } = review;

  return (
    <View style={styles.reviewItem.container}>
      <View style={styles.reviewItem.ratingContainer}>
        <Text style={styles.reviewItem.rating}>{rating}</Text>
      </View>
      <View style={styles.reviewItem.reviewContainer}>
        <View>
          <Text fontWeight="bold">{user.username}</Text>
          <Text color="textSecondary">{format(new Date(createdAt), "MM-dd-yyyy")}</Text>
        </View>
        <Text style={styles.reviewItem.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  button: {
    margin: 8,
    padding: 16,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  reviewItem: {
    container: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: 16,
      backgroundColor: theme.colors.white,
    },
    ratingContainer: {
      width: 40,
      height: 40,
      color: theme.colors.primary,
      border: `2px solid`,
      borderColor: theme.colors.primary,
      borderRadius: 40 / 2,
    },
    rating: {
      margin: `auto`,
      padding: 4,
      color: theme.colors.primary,
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
    },
    reviewContainer: {
      display: "flex",
      gap: 8,
      flexShrink: 1,
    },
  }
});

export default SingleRepositoryView;
