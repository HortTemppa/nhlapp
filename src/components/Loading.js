import React from "react";
import Loader from 'react-loader-spinner'

const Loading = () => {
  return <div className = 'Loader'><Loader type="Oval" color="black" height={40} width={40} />
</div>
};

export default Loading;
