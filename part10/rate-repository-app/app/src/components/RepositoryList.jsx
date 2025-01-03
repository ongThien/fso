import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import useRepositories from '../hooks/useRepositories';

import sortOptions from '../utils/sortOptions';

import RepositoryItem from './RepositoryItem';
import SearchAndSortRepositories from './SearchAndSortRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { searchKeywordValue, setSearchKeyword, selectedOption, setSelectedOption } = this.props;

    return (
      <SearchAndSortRepositories
        searchKeyword={searchKeywordValue}
        setSearchKeyword={setSearchKeyword}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={repositoryNodes}
        renderItem={({ item }) =>
          <Pressable onPress={() => navigate(`/repos/${item.id}`)}>
            <RepositoryItem key={item.id} item={item} />
          </Pressable>
        }
      />
    );
  }
}

// export const RepositoryListContainer = ({ repositories, ListHeaderComponent }) => {
//   const navigate = useNavigate();
//   const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

//   return (
//     <FlatList
//       ListHeaderComponent={ListHeaderComponent}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       data={repositoryNodes}
//       renderItem={({ item }) =>
//         <Pressable onPress={() => navigate(`/repos/${item.id}`)}>
//           <RepositoryItem key={item.id} item={item} />
//         </Pressable>
//       }
//     />
//   );
// };

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordValue] = useDebounce(searchKeyword, 500, { maxWait: 2000 });
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const { data, loading, error } = useRepositories(selectedOption.value, searchKeywordValue);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Something went wrong!</Text>;

  return (
    <RepositoryListContainer
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      repositories={data.repositories}
      navigate={navigate}
    // ListHeaderComponent={
    //   <SearchAndSortRepositories
    //     searchKeyword={searchKeywordValue}
    //     setSearchKeyword={deboucedSetSearchKeyword}
    //     selectedOption={selectedOption}
    //     setSelectedOption={setSelectedOption}
    //   />
    // }
    />
  );
};

export default RepositoryList;
