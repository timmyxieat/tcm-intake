import { MainLayout } from "@/components/layout/MainLayout";
import { mockPatients, mockPatientsData } from "@/data/mockPatients";

export default function Home() {
  return (
    <MainLayout
      patients={mockPatients}
      patientsData={mockPatientsData}
      initialPatientId="2"
    />
  );
}
