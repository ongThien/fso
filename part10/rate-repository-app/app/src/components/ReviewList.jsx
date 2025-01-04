import { format } from "date-fns";

import useUserInfo from "../hooks/useUserInfo";

import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewList = () => {

  const { data, loading, error, refetch } = useUserInfo(true);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data!</Text>;

  const { reviews } = data.me;
  const reviewsData = reviews && reviews.edges ? reviews.edges.map(edge => edge.node) : [];
  // console.log(reviewsData);

  return (
    <FlatList
      data={reviewsData}
      renderItem={({ item }) => <ReviewItem key={item.id} review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const ReviewItem = ({ review, refetch }) => {

  const { createdAt, rating, text, repository, id: reviewID } = review;
  const navigate = useNavigate();
  const deleteReview = useDeleteReview();

  const viewBtnHandler = (id) => navigate(`/repos/${id}`);
  const deleteBtnHandler = (id) => {

    const deleteFn = async (id) => {
      console.log("ID", id);

      try {
        await deleteReview(id);
        refetch();
      } catch (error) {
        console.log(error);
      }
    }

    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Delete",
        onPress: () => deleteFn(id)
      }
    ])
  };

  return (
    <>
      <View style={styles.reviewItem.container}>
        <View style={styles.reviewItem.ratingContainer}>
          <Text style={styles.reviewItem.rating}>{rating}</Text>
        </View>
        <View style={styles.reviewItem.reviewContainer}>
          <View>
            <Text fontWeight="bold">{repository.fullName}</Text>
            <Text color="textSecondary">{format(new Date(createdAt), "MM-dd-yyyy")}</Text>
          </View>
          <Text style={styles.reviewItem.reviewText}>{text}</Text>
        </View>
      </View>
      <View style={styles.reviewItem.actions}>
        <Pressable style={styles.reviewItem.actions.viewBtn} onPress={() => viewBtnHandler(repository.id)}>
          <Text color="white" fontWeight="bold">View repository</Text>
        </Pressable>
        <Pressable style={styles.reviewItem.actions.deleteBtn} onPress={() => deleteBtnHandler(reviewID)}>
          <Text color="white" fontWeight="bold">Delete review</Text>
        </Pressable>
      </View>
    </>
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
      flexShrink: 1,
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
    actions: {
      backgroundColor: theme.colors.white,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 8,

      viewBtn: {
        padding: 16,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
      },

      deleteBtn: {
        padding: 16,
        backgroundColor: theme.colors.errors,
        borderRadius: 8,
      }
    }
  }
});


export default ReviewList;
