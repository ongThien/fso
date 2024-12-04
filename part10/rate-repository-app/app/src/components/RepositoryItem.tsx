import { Image, StyleSheet, View } from "react-native";

import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";

interface RepositoryItemProps {
  item: {
    id: string;
    fullName: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number;
    reviewCount: number;
    ownerAvatarUrl: string;
  }
}

const styles = StyleSheet.create({
  mainContaner: {
    display: "flex",
    backgroundColor: theme.colors.white,
    padding: Constants.statusBarHeight,
    width: "auto",
    gap: 8,
  },
  columnContainer: {
    display: "flex",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  statListContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemInfoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  itemInfoImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    padding: 4,
    // margin: 4
  },
  itemInfoText: {
    padding: 4,
    gap: 8,
  },
  itemInfoLanguage: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  }
})

const RepositoryItem = ({ item }: RepositoryItemProps) => {

  return (
    <View style={styles.mainContaner}>
      <ItemInfo item={item} />
      <View style={styles.statListContainer}>
        <ItemStat statName="Stars" stat={formatStat(item.stargazersCount)} />
        <ItemStat statName="Forks" stat={formatStat(item.forksCount)} />
        <ItemStat statName="Reviews" stat={formatStat(item.reviewCount)} />
        <ItemStat statName="Rating" stat={formatStat(item.ratingAverage)} />
      </View>
    </View>
  );
};

const ItemInfo = ({ item }: RepositoryItemProps) => {
  return <View style={styles.itemInfoContainer}>
    <Image
      style={styles.itemInfoImage}
      source={{ uri: item.ownerAvatarUrl }}
    />
    <View style={{...styles.columnContainer, ...styles.itemInfoText}}>
      <Text fontWeight="bold">{item.fullName}</Text>
      <Text color="textSecondary">{item.description}</Text>
      <Text
        color="white"
        style={styles.itemInfoLanguage}
      >
        {item.language}
      </Text>
    </View>
  </View>
}

interface ItemStatProps {
  statName: string;
  stat: string;
}

const ItemStat = ({ statName, stat }: ItemStatProps) => {
  return <View style={{
    ...styles.columnContainer,
    alignItems: "center",
  }}>
    <Text color="textPrimary" fontWeight="bold">{stat}</Text>
    <Text color="textSecondary">{statName}</Text>
  </View>
}

function formatStat(count: number): string {
  if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
  } else {
      return count.toString();
  }
}

export default RepositoryItem;
