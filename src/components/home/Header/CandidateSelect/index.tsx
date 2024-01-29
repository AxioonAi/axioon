import { ProfileSelector } from "@/components/Global/CitySelector";

interface Props {
  profiles: string[];
  selectedProfile: {
    name: string;
    politicalGroup: string;
    id: string;
  };
  setSelectedProfile: any;
  id?: string;
}

export function HeaderCandidateSelect({
  profiles,
  selectedProfile,
  setSelectedProfile,
  id,
}: Props) {
  return (
    <>
      {profiles ? (
        <ProfileSelector
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          profiles={profiles}
        />
      ) : (
        <></>
      )}
    </>
  );
}
