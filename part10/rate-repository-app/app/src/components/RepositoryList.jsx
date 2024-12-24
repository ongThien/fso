import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import SortRepositoriesPicker from './SortRepositoriesPicker';
import sortOptions from '../utils/sortOptions';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, ListHeaderComponent }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={repositoryNodes}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/repos/${item.id}`)}>
          <RepositoryItem key={item.id} item={item} />
        </Pressable>
      }
    />
  );
};

const RepositoryList = () => {

  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const { data, loading, error } = useRepositories(selectedOption.value);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Something went wrong!</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      ListHeaderComponent={
        <SortRepositoriesPicker
          options={sortOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      }
    />
  );
};

export default RepositoryList;
