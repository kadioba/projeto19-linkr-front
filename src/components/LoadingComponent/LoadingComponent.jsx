import { LoadingContainer } from "./styles";
import { MutatingDots } from "react-loader-spinner";

export function LoadingComponent() {
  return (
    <LoadingContainer>
      <MutatingDots
        ariaLabel="mutating-dots-loading"
        color="#ffffff"
        height={100}
        radius={12.5}
        secondaryColor="#ffffff"
        visible={true}
        width={100}
        wrapperClass=""
        wrapperStyle={{}}
      />
    </LoadingContainer>
  );
}
