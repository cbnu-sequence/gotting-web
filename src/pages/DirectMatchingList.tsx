import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MatchingListSortingFilter from '../components/matchingList/MatchingListSortingedFilter';
import MatchingList from '../components/matchingList/MatchingList';
import { StyledContainer, ListDiv } from '../components/matchingList/styles';
import { MatchingPost, getMatchingPostAll } from '../apis/MatchingPostApis';
import { useReadMatchingPosts } from '../services/MatchingPostServices';

const DirectMatchingList = () => {
  const [isSortedByDistance, setIsSortedByDistance] = useState(true);
  const [isSortedByRegistrationDate, setIsSortedByRegistrationDate] =
    useState(false);

  const handleSortedBy = (sortBy: 'distance' | 'registrationDate') => {
    if (sortBy !== 'distance' && sortBy !== 'registrationDate') return;
    if (sortBy === 'distance') {
      setIsSortedByDistance(true);
      setIsSortedByRegistrationDate(false);
      return;
      // distance에 따른 정렬 API 호출
    }
    setIsSortedByDistance(false);
    setIsSortedByRegistrationDate(true);
    // registrationDate에 따른 정렬 API 호출
  };

  // 리스트 아이템: 날짜, 학교, 학번, 제목, 해시태그, 매칭완료여부
  // const [title, setTitle] = useState('');
  // const [date, setDate] = useState('');

  const { data: matchingPosts, isLoading } = useReadMatchingPosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <StyledContainer>
        <ListDiv>
          <MatchingListSortingFilter
            isSortedByDistance={isSortedByDistance}
            isSortedByRegistrationDate={isSortedByRegistrationDate}
            handleSortedBy={handleSortedBy}
          />
          {matchingPosts && <MatchingList posts={matchingPosts} />}
        </ListDiv>
      </StyledContainer>
    </>
  );
};

export default DirectMatchingList;
