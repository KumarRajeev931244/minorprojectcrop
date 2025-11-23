
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

// defining interface 
interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmailTemplates({username,otp}:VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>CropAI Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your CropAI verification code: {otp}</Preview>

      <Section style={{ padding: "20px", fontFamily: "Roboto" }}>
        <Row>
          <Heading
            as="h2"
            style={{ color: "#2f855a", marginBottom: "12px" }}
          >
            Welcome to CropAI, {username} 🌱
          </Heading>
        </Row>

        <Row>
          <Text style={{ fontSize: "15px", marginBottom: "10px" }}>
            Thank you for registering with <strong>CropAI</strong> — your smart
            assistant for crop identification and disease management.
          </Text>
        </Row>

        <Row>
          <Text style={{ fontSize: "15px", marginBottom: "10px" }}>
            Use the verification code below to activate your account:
          </Text>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "6px",
              color: "#22543d",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            {otp}
          </Text>
        </Row>

        <Row>
          <Text style={{ fontSize: "14px", marginTop: "20px" }}>
            This code will expire in 10 minutes. If you did not request this
            verification, please ignore this email.
          </Text>
        </Row>

        <Row>
          <Text style={{ fontSize: "14px", color: "#4a5568", marginTop: "25px" }}>
            🌿 <strong>CropAI Team</strong>  
            <br />
            Empowering farmers with AI-driven crop insights.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
