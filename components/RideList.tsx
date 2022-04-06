import { FC, Fragment } from 'react';
import { RideDataArrayType } from '../hooks/useGetRides';
import { UserDataInterface } from '../hooks/useGetUser';
import { viewHashType } from '../pages';
import EachRide from './EachRide';

interface RideListInterface {
  ridesArray: RideDataArrayType;
  viewHash: viewHashType;
  userData: UserDataInterface | null;
}
const RideList: FC<RideListInterface> = (props) => {
  // Props
  const { ridesArray, viewHash, userData } = props;

  return (
    <>
      {ridesArray &&
        ridesArray!.map((eachRide, index) => {
          const { id } = eachRide;
          return (
            <Fragment key={id + index + Math.random() * 100}>
              <EachRide userData={userData} {...eachRide} />
            </Fragment>
          );
        })}
    </>
  );
};

export default RideList;
