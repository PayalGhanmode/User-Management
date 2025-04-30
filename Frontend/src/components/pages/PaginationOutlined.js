import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';


export default function PaginationOutlined({ totalPages, pageNo, setpageNo }) {

  const handlepagenet = (event, page) => {

    setpageNo(page);

  }

  return (
    <Stack spacing={2}>
      <Pagination  color="secondary"className="pagenet" count={totalPages} page={pageNo}
        onChange={handlepagenet} variant="outlined" />

    </Stack>
  );
}
