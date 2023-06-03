import { LoadingContainer } from "./styles";
import { MutatingDots } from "react-loader-spinner";

export function LoadingComponent() {
  return (
    <LoadingContainer>
      <MutatingDots
        height={100}
        width={100}
        color="#ffffff"
        secondaryColor="#ffffff"
        radius={12.5}
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoadingContainer>
  );
}
