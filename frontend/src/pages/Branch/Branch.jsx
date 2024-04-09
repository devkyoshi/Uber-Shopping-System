import React from 'react';
import { AddBranch } from '../../components/branch_Branch/AddBranch';
import { ViewBranch } from '../../components/branch_Branch/ViewBranch';
import { ViewBranches } from '../../components/branch_Branch/ViewBranches';
import { ManageBranch } from '../../components/branch_Branch/ManageBranch';

export default function Branch({ branchID }) {
  return (
    <div>
      <div className='main-layout bg'>
        <div className='inner-layout'> 
          <AddBranch />
        </div>
        <div className='inner-layout'> 
          <ViewBranch branchID={branchID} />
        </div>
        <div className='inner-layout'> 
          <ViewBranches />
        </div>
        <div className='inner-layout'> 
          <ManageBranch />
        </div>
      </div>
    </div>
  );
}
