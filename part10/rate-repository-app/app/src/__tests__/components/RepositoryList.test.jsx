import { render, screen, within } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";
import { formatStat } from "../../components/RepositoryItem";
import { MemoryRouter } from "react-router-native";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(
        // MemoryRouter needed to give context for useNavigate inside RepositoryListContainer
        // are there any better way?
        <MemoryRouter>
          <RepositoryListContainer repositories={repositories} />
        </MemoryRouter>
      );

      const [firstItem, secondItem] = screen.getAllByTestId("repositoryItem");
      checkRepoFields(firstItem, repositories.edges[0].node);
      checkRepoFields(secondItem, repositories.edges[1].node);

    });
  });
});

function checkRepoFields(renderedItem, repoData) {
  const item = within(renderedItem);
  expect(item.getByText(repoData.fullName)).toBeOnTheScreen();
  expect(item.getByText(repoData.description)).toBeOnTheScreen();
  expect(item.getByText(repoData.language)).toBeOnTheScreen();
  expect(item.getByText(formatStat(repoData.forksCount))).toBeOnTheScreen();
  expect(item.getByText(formatStat(repoData.stargazersCount))).toBeOnTheScreen();
  expect(item.getByText(formatStat(repoData.reviewCount))).toBeOnTheScreen();
  expect(item.getByText(formatStat(repoData.ratingAverage))).toBeOnTheScreen();
}
