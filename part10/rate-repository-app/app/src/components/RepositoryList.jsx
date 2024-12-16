import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // other props
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
    />
  );
};

const RepositoryList = () => {
  // const repositories = useRepositories();
  const { data, loading, error } = useRepositories();

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Something went wrong!</Text>

  // console.log("DATA", data);

  return <RepositoryListContainer repositories={data.repositories}/>
};

export default RepositoryList;
