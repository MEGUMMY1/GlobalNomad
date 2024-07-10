import ActivityDetails from '@/components/ActivityDetails/ActivityDetails';
import activityData from '@/components/ActivityDetails/temp.json';

export const getStaticProps = async () => {
  return {
    props: {
      layoutType: 'mobileLayout',
    },
  };
};

export default function activityDetails() {
  return <ActivityDetails activity={activityData} />;
}
