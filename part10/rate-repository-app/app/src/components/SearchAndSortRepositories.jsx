import { Searchbar } from 'react-native-paper';

import sortOptions from '../utils/sortOptions';
import { View } from 'react-native';
import SortRepositoriesPicker from "./SortRepositoriesPicker";


const SearchAndSortRepositories = ({ searchKeyword, setSearchKeyword, selectedOption, setSelectedOption }) => {

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        mode="view"
      />
      <SortRepositoriesPicker
        options={sortOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </View>
  );
};

export default SearchAndSortRepositories;
