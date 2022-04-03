import {act, create} from 'react-test-renderer';
import TuitStats from "./tuit-stats";

test('stats render correctly', () => {
  let stats = {
    dislikes: 123,
    replies: 234,
    retuits: 345
  }
  
  const likeTuit = () => {
    act(() => {
      stats.dislikes++;
      tuitStats.update(
        <TuitStats
          tuit={{stats: stats}}
          dislikeTuit={() => {}}
        />)
    })
  }
  
  let tuitStats
  act(() => {
    tuitStats = create(
      <TuitStats
        dislikeTuit={dislikeTuit}
        tuit={{stats: stats}}/>
    );
  })
  
  const root = tuitStats.root;
  const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
  // const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
  // const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
  const dislikeTuitButton = root.findByProps(
    {id: 'ttr-stats-likes-btn'})

  let dislikesText = dislikesCounter.children[0];
  // const repliesText = repliesCounter.children[0];
  // const retuitsText = retuitsCounter.children[0];
  expect(dislikesText).toBe('123');
  expect(repliesText).toBe('234');
  expect(retuitsText).toBe('345');
  
  act(() => {dislikeTuitButton.props.onClick()})
  dislikesText = dislikesCounter.children[0];
  expect(likesText).toBe('124');
});